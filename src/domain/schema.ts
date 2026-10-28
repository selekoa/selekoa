import { z } from 'zod';
import {
  predicates,
  propositionStances,
  topics,
  type Predicate,
} from './predicates';
import {
  comparisonKey,
  facetById,
  isComparisonKey,
} from './framework-comparison';

const id = z.string().regex(/^[a-z][a-z0-9-]+$/);
const text = z.string().trim().min(1);
const httpUrl = z
  .url()
  .refine(
    (s) => /^https?:\/\//.test(s),
    'Only HTTP(S) source URLs are allowed',
  );

// Precision is retained in the stored string; unknown month/day are never invented.
export const historicalDate = z
  .string()
  .regex(/^\d{4}(-\d{2}(-\d{2})?)?$/)
  .refine((s) => {
    const [year, month = 1, day = 1] = s.split('-').map(Number);
    const d = new Date(Date.UTC(year, month - 1, day));
    return (
      year >= 1000 &&
      d.getUTCFullYear() === year &&
      d.getUTCMonth() === month - 1 &&
      d.getUTCDate() === day
    );
  }, 'Invalid calendar date');
const checkDate = z.iso.date();
// BCP 47 language tag in canonical form with an ISO 639 primary language,
// for example "en", "zh-Hans", "zh-Hant".
const languageTag = z.string().refine((s) => {
  if (!/^[a-z]{2,3}(-|$)/.test(s)) return false;
  try {
    return Intl.getCanonicalLocales(s)[0] === s;
  } catch {
    return false;
  }
}, 'Language must be a canonical BCP 47 tag');
const wordCount = (s: string) => s.trim().split(/\s+/).length;
/**
 * Quoted words allowed from one document (each edition counts separately) of
 * the given length (maintainer decision of 2026-10-15): about 10% under 2,000
 * words; otherwise 400 words or 5% of the document, whichever is larger, and
 * never more than 800.
 */
export const maxQuotedWords = (documentWords: number) =>
  documentWords < 2000
    ? Math.floor(documentWords / 10)
    : Math.min(800, Math.max(400, Math.floor(documentWords / 20)));
/**
 * Under 2,000 words, one complete sentence of up to 25 words may be quoted
 * where 10% would leave a misleading fragment: the source's only quoted
 * passage, ending in sentence punctuation (2026-10-15).
 */
export const shortTextSentenceWords = 25;
export const withinQuotationLimit = (
  documentWords: number,
  passages: readonly string[],
) => {
  const unique = [
    ...new Set(passages.map((p) => p.trim().replace(/\s+/g, ' '))),
  ];
  const total = unique.reduce((n, p) => n + wordCount(p), 0);
  if (total <= maxQuotedWords(documentWords)) return true;
  return (
    documentWords < 2000 &&
    unique.length === 1 &&
    total <= shortTextSentenceWords &&
    /[.!?][’”'")\]]*$/.test(unique[0])
  );
};
const waybackTimestamp =
  /^https:\/\/web\.archive\.org\/web\/(\d{4})(\d{2})(\d{2})\d{0,8}\//;

// Bounds are used only to reject impossible ordering; stored precision is unchanged.
function dateBoundary(value: string, latest: boolean): number {
  const [year, suppliedMonth, suppliedDay] = value.split('-').map(Number);
  const month = suppliedMonth ?? (latest ? 12 : 1);
  const day =
    suppliedDay ??
    (latest ? new Date(Date.UTC(year, month, 0)).getUTCDate() : 1);
  return Date.UTC(year, month - 1, day);
}

/** Roles a text holds for a proposition across the located texts (schema 2.11). */
export const thoughtRoles = [
  'earliest-located',
  'earliest-located-term',
  'articulation',
  'most-developed',
  'contesting',
  'context',
  // Schema 2.12: a later restatement of a point the same author made before.
  'later-restatement',
  // Schema 2.13: the earliest located record among tier-2 texts, in a
  // collection that sorts its texts into tiers; shown beside the tier-1 role.
  'earliest-located-tier-2',
] as const;
export type ThoughtRole = (typeof thoughtRoles)[number];
type Stance = (typeof propositionStances)[keyof typeof propositionStances];
/** Roles each kind of proposition record may hold, and the one it must hold. */
const allowedRoles: Record<Stance, readonly ThoughtRole[]> = {
  articulates: [
    'earliest-located',
    'earliest-located-term',
    'articulation',
    'most-developed',
    'later-restatement',
    'earliest-located-tier-2',
  ],
  // Schema 2.12: a contesting record can be the earliest located one.
  contests: [
    'contesting',
    'earliest-located',
    'earliest-located-term',
    'later-restatement',
    'earliest-located-tier-2',
  ],
  bears_on: ['context', 'earliest-located-term', 'later-restatement'],
};
const mainRoles: Record<Stance, readonly ThoughtRole[]> = {
  articulates: [
    'earliest-located',
    'articulation',
    'most-developed',
    'earliest-located-tier-2',
  ],
  contests: ['contesting'],
  bears_on: ['context'],
};
/** The register of the passage a proposition record rests on (schema 2.11). */
export const registers = [
  'nonfiction',
  'fiction',
  'satirical',
  'dream',
  'relay',
] as const;
export type Register = (typeof registers)[number];
/**
 * How a contesting record engages the proposition (schema 2.12): its message
 * or dialogue turn gives a reason against a premise, or it states the
 * contrary conclusion only.
 */
export const engagements = ['engages-premise', 'contrary-only'] as const;
export type Engagement = (typeof engagements)[number];
/**
 * A source tier (schema 2.13), for a collection that sorts its texts by who
 * wrote them and in which form: tier 1 or tier 2 under the collection's own
 * rule, which the basis applies to the text.
 */
export const tiers = [1, 2] as const;
/** Records that may keep the activity stage `announced` (schema 2.15). */
const announcedStagePredicates = new Set<string>([
  'held_role',
  'co_founded',
  'departure_announced',
  'unit_of',
  'acquired',
  'combined_into',
  'licensing_hiring_agreement',
  'unit_disbanded',
  // Schema 2.19: an announced revocation or rescission, not yet formalised.
  'revoked',
]);
/** Legislative and executive status records (schema 2.19). */
const statusPredicates = new Set<string>([
  'introduced',
  'passed',
  'vetoed',
  'revoked',
]);
export type Tier = (typeof tiers)[number];

export const entitySchema = z.strictObject({
  id,
  name: text,
  shortName: text.optional(),
  /** Person index form, "Family, Given"; a cataloguing convention, not a claim. */
  sortName: text.regex(/^[^,]+, [^,]+$/, 'Use "Family, Given" form').optional(),
  type: z.enum([
    'organisation',
    'person',
    'concept',
    'document',
    'infrastructure',
    'model',
    'public_body',
    'fund',
    // Schema 2.19: a state, keyed by its ISO 3166-1 alpha-2 code.
    'country',
  ]),
  subtype: text,
  aliases: z.array(text),
  /** Schema 2.19. A country's ISO 3166-1 alpha-2 code; its ID is `country-` and the code in lower case. */
  countryCode: z
    .string()
    .regex(/^[A-Z]{2}$/)
    .optional(),
  /**
   * Schema 2.19. The names an organisation or public body bore, each dated as
   * its source dates it, with the sources that name or announce it. A renaming
   * keeps one entity; the dates are of the names, not of any legal succession.
   */
  datedNames: z
    .array(
      z.strictObject({
        name: text,
        from: historicalDate.optional(),
        until: historicalDate.optional(),
        note: text,
        sourceIds: z.array(id).min(1),
      }),
    )
    .min(2)
    .optional(),
  description: text.max(600),
  sourceIds: z.array(id).min(1),
  externalIds: z.record(z.string(), text).optional(),
  documentVersion: z
    .strictObject({
      family: id,
      label: text,
      publisherId: id,
      publishedAt: historicalDate.optional(),
      effectiveAt: historicalDate.optional(),
      revisedAt: historicalDate.optional(),
      dateNote: text,
    })
    .optional(),
  // A proposition that texts articulate, contest or bear on (schema 2.11): its
  // code in the collection, the one criterion texts are classified against and
  // its usual names, if any.
  proposition: z
    .strictObject({
      // A letter suffix (M06a, M06b) splits a proposition from schema 2.13.
      code: z.string().regex(/^[A-Z][0-9]+[a-z]?$/),
      criterion: text,
      terms: z.array(text),
      // Schema 2.16. An earliest located role that no articulation holds
      // for now, by a recorded decision, while a lead is checked. The reason
      // names the lead; validation then expects no holder in that tier.
      withheld: z
        .array(
          z.strictObject({
            role: z.enum(['earliest-located', 'earliest-located-tier-2']),
            reason: text,
            recordedAt: checkDate,
          }),
        )
        .min(1)
        .optional(),
    })
    .optional(),
});

const timeSchema = z.discriminatedUnion('kind', [
  z.strictObject({
    kind: z.literal('event'),
    date: historicalDate,
    basis: z
      .enum([
        'publication',
        'effective',
        'revision',
        'announcement',
        'signature',
      ])
      .optional(),
    note: text,
  }),
  z.strictObject({
    kind: z.literal('snapshot'),
    date: historicalDate,
    note: text,
  }),
  z.strictObject({
    kind: z.literal('interval'),
    from: historicalDate.optional(),
    until: historicalDate.optional(),
    note: text,
  }),
  z.strictObject({ kind: z.literal('unknown'), note: text }),
]);
const objectSchema = z.discriminatedUnion('kind', [
  z.strictObject({ kind: z.literal('entity'), entityId: id }),
  z.strictObject({
    kind: z.literal('literal'),
    value: z.union([text, z.number().finite()]),
    unit: text.optional(),
  }),
]);

export const claimSchema = z.strictObject({
  id,
  subject: id,
  predicate: z.enum(Object.keys(predicates) as [Predicate, ...Predicate[]]),
  object: objectSchema,
  topic: z.enum(topics),
  statement: text.max(800),
  time: timeSchema,
  // `posed` (schema 2.10): Selekoa frames the proposition as a question that
  // sources take positions on; no source is recorded as stating it as framed.
  derivation: z.enum(['explicit', 'inferred', 'posed']),
  resolution: z.enum(['supported', 'contested', 'unresolved']),
  inferenceRationale: text.optional(),
  editorialState: z.enum(['seed', 'accepted']),
  qualification: text,
  evidenceIds: z.array(id).min(1),
  recordedAt: checkDate,
  supersedes: id.optional(),
  attributes: z
    .strictObject({
      method: text.optional(),
      activityStage: z
        .enum(['proposed', 'announced', 'reported_performed'])
        .optional(),
      evaluatedSystem: text.optional(),
      activityScope: text.optional(),
      transitionScope: z
        .enum(['separation_announcement', 'name_announcement'])
        .optional(),
      changeBasis: z
        .enum([
          'publisher_statement',
          'changelog',
          'document_comparison',
          'assessment',
        ])
        .optional(),
      // One framework provision, aligned across editions of a family by key.
      provision: z
        .strictObject({
          // Schema 2.18 adds the kinds of the paraphrased comparison
          // questions: risk domains, evaluation timing, reporting, revision.
          kind: z.enum([
            'threshold',
            'required_action',
            'decision_authority',
            'exception',
            'risk_domain',
            'evaluation_timing',
            'reporting',
            'revision',
          ]),
          key: id,
          parties: z
            .array(
              z.strictObject({
                role: z.enum([
                  'decides',
                  'recommends',
                  'can_overrule',
                  'informed',
                  'consulted',
                ]),
                actor: text,
              }),
            )
            .min(1)
            .optional(),
          // Schema 2.17. A framework comparison cell: the edition-neutral
          // question (facet) the record answers for this edition, and for a
          // stated cell whether the passage meets the question's criterion as
          // worded, only in a weaker form (Rule B, 2026-10-27), or is a
          // recorded passage the comparison could not re-check.
          facet: z
            .strictObject({
              id: text,
              status: z.enum(['stated', 'partly', 'recorded']).optional(),
            })
            .optional(),
          // Schema 2.19. A date the edition does not state but that follows
          // from a rule it states (such as entry into force on the twentieth
          // day after publication): the record is inferred, quotes the rule
          // and is dated by the computed date.
          computed: z.literal(true).optional(),
        })
        .optional(),
      // A control relation or restructuring step (schema 2.9): the right
      // held, if any, the instrument it operates through, and whether the
      // arrangement was planned, announced, agreed in principle or effective.
      control: z
        .strictObject({
          right: z
            .enum([
              'controls',
              'sole_member',
              'general_partner',
              'voting_control',
              'elects_directors',
              'appoints_directors',
              'removes_directors',
              'approves_amendments',
              'veto',
            ])
            .optional(),
          instrument: text,
          stage: z.enum([
            'planned',
            'announced',
            'agreed_in_principle',
            'effective',
          ]),
        })
        .optional(),
      // A signatory, refusal or explicit link to a commitment text or legal
      // obligation (schema 2.9). None of these is evidence of compliance.
      commitment: z
        .strictObject({
          stage: z.enum(['intent_announced', 'signed', 'listed']).optional(),
          scope: text.optional(),
          link: z
            .enum([
              'fulfils',
              'implements',
              'responds_to',
              'designated_under',
              'complies_with',
              'names',
            ])
            .optional(),
        })
        .optional(),
      // Schema 2.19. A document-level list of participants (signatories,
      // endorsers, attendees or reporting organisations): how many entries
      // the list has, and whether the source states that number or Selekoa
      // counted the entries. A listing is not a signature or compliance.
      listing: z
        .strictObject({
          count: z.number().int().positive(),
          countBasis: z.enum(['stated', 'counted']),
        })
        .optional(),
      role: text.optional(),
      // Schema 2.15. A reason for the recorded event as stated by the person
      // or organisation concerned: who stated it (an entity), a neutral
      // paraphrase, and the evidence passage it rests on. Never an inferred
      // motive; a statement that mentions it attributes it.
      statedReason: z
        .strictObject({ by: id, text: text.max(400), evidenceId: id })
        .optional(),
      transactionType: z
        .enum([
          'investment',
          'equity_investment',
          'convertible_debt',
          'funding_round',
          'venture_equity',
          'infrastructure_spend',
          'cloud_services',
          'compute_capacity',
          'hardware_deployment',
          'infrastructure_use',
        ])
        .optional(),
      relationshipContext: z.enum(['external', 'internal']).optional(),
      period: text.optional(),
      conditions: text.optional(),
      transactionStage: z
        .enum([
          'announced',
          'planned',
          'committed',
          'contracted',
          'invested',
          'closed',
          'paid',
          'purchased',
          'delivered',
          'deployed',
          'operational',
          'completed',
          'undisclosed',
        ])
        .optional(),
      amount: z
        .strictObject({
          value: z.number().nonnegative().finite(),
          currency: z.string().regex(/^[A-Z]{3}$/),
          bound: z.enum([
            'exact',
            'up_to',
            'at_least',
            'approximate',
            'more_than',
            'less_than',
          ]),
          scope: z.enum(['transaction', 'round_total', 'cumulative']),
        })
        .optional(),
      // How a text stands to a proposition (schema 2.11): its roles across the
      // located texts, the register of the passage, the usual name it uses (for
      // the earliest-located-term role), a short qualifier, the element a
      // context record lacks, and dates other than the work's own: an earlier
      // claimed date that does not date the wording, and the later date from
      // which the quoted wording is attested.
      thought: z
        .strictObject({
          roles: z.array(z.enum(thoughtRoles)).min(1),
          register: z.enum(registers),
          term: text.optional(),
          qualifier: text.optional(),
          missing: text.optional(),
          claimed: z
            .strictObject({ date: historicalDate, note: text })
            .optional(),
          attested: z
            .strictObject({ date: historicalDate.optional(), note: text })
            .optional(),
          // Schema 2.12. For a contesting record: whether its message or
          // dialogue turn gives a reason against a premise, with a
          // one-sentence rationale.
          engagement: z
            .strictObject({ kind: z.enum(engagements), rationale: text })
            .optional(),
          // Schema 2.12. The author reports an earlier belief of their own.
          // The record is dated by the report; `from` and `until` date the
          // belief reported, which never decides earliest located.
          retrospective: z
            .strictObject({
              from: historicalDate.optional(),
              until: historicalDate.optional(),
              note: text,
            })
            .optional(),
          // Schema 2.13. The text's tier under the collection's rule, with
          // the one-line basis that applies the rule to it.
          tier: z
            .strictObject({
              value: z.union([z.literal(1), z.literal(2)]),
              basis: text,
            })
            .optional(),
          // Schema 2.13. The model assumptions or stated conditions under
          // which the passage holds; a conditional result is never an
          // unconditional forecast.
          conditions: text.optional(),
          // Schema 2.13. Each estimate the text states, as worded, with its
          // holder, horizon, definition and conditions. Estimates from
          // different texts are never converted or combined.
          estimates: z
            .array(
              z.strictObject({
                holder: text,
                value: text,
                horizon: text,
                definition: text,
                conditional: z.boolean(),
                conditions: text.optional(),
              }),
            )
            .min(1)
            .optional(),
        })
        .optional(),
      quantity: z
        .strictObject({
          value: z.number().nonnegative().finite(),
          unit: text,
          bound: z
            .enum([
              'exact',
              'up_to',
              'at_least',
              'approximate',
              'more_than',
              'less_than',
            ])
            .optional(),
        })
        .optional(),
    })
    .optional(),
});

/**
 * Assessment records: competent sources' characterisations of a version
 * change's effect, of a stated provision or of how an entity is controlled.
 */
export function isAssessment(c: Pick<Claim, 'predicate' | 'attributes'>) {
  return (
    c.attributes?.changeBasis === 'assessment' ||
    c.predicate === 'provision_assessed' ||
    c.predicate === 'control_assessed'
  );
}

export const sourceSchema = z.strictObject({
  id,
  documentId: id.optional(),
  title: text,
  authors: z.array(text).min(1),
  // Schema 2.14. The credited names in `authors`, one entry each and in the
  // same order, split for citation: a person's family and given names (and a
  // suffix such as "Jr."), or a literal name for an organisation, a group or
  // a pseudonym, which is never split. Omitted where a split is uncertain.
  authorNames: z
    .array(
      z.union([
        z.strictObject({ family: text, given: text, suffix: text.optional() }),
        z.strictObject({ literal: text }),
      ]),
    )
    .optional(),
  publisher: text,
  publisherId: id.optional(),
  publicationDate: historicalDate.nullable(),
  version: text,
  versionDate: historicalDate.optional(),
  canonicalUrl: httpUrl,
  evidenceUrl: httpUrl,
  // Language of the inspected expression, not of a translation or summary.
  language: languageTag.optional(),
  // An existing archive copy and its capture date. A capture authenticates
  // only the bytes held at that date, never an earlier expression.
  archivedUrl: httpUrl.optional(),
  archivedAt: checkDate.optional(),
  // Approximate length of the inspected document, so the per-document
  // quotation limit can be checked (schema 2.8): the count and how it was made.
  documentWords: z
    .strictObject({ count: z.number().int().positive(), basis: text })
    .optional(),
  kind: z.enum([
    'announcement',
    'paper',
    'report',
    'dataset',
    'article',
    'filing',
    // Schema 2.11: books, mailing-list and newsgroup messages, forum and blog posts.
    'book',
    'message',
    'post',
  ]),
  accessedAt: checkDate,
  reuse: z.strictObject({ attribution: text, licence: text, note: text }),
  upstream: z
    .strictObject({
      dataset: text,
      version: text,
      retrievedAt: checkDate,
      recordLocator: text,
      termsUrl: httpUrl,
    })
    .optional(),
});

export const evidenceSchema = z.strictObject({
  id,
  claimId: id,
  sourceId: id,
  sourceRole: z.enum(['primary', 'secondary']),
  support: z.enum(['supports', 'contradicts', 'context']),
  locator: text,
  passage: text.max(700),
  passageType: z.enum(['quote', 'paraphrase']),
  verification: z.enum(['machine_checked', 'human_reviewed']),
  checkedAt: checkDate,
  reviewer: text.optional(),
  note: text,
  // Schema 2.15. How the passage was read for its machine check: directly
  // from the publisher, through a third-party reader relay that renders the
  // publisher's current page (not an archive copy), or through X's own
  // syndication endpoint for a post's text. Omitted on earlier records.
  retrievalRoute: z
    .enum(['direct', 'reader_relay', 'x_syndication'])
    .optional(),
  // Schema 2.12. A passage that misleads when shown alone: why, the context
  // it must be shown with, and the records that supply that context.
  contextOnly: z
    .strictObject({
      reason: text,
      requires: text,
      claimIds: z.array(id).optional(),
    })
    .optional(),
});

export const datasetSchema = z
  .strictObject({
    meta: z.strictObject({
      schemaVersion: z.enum([
        '2.0',
        '2.1',
        '2.2',
        '2.3',
        '2.4',
        '2.5',
        '2.6',
        '2.7',
        '2.8',
        '2.9',
        '2.10',
        '2.11',
        '2.12',
        '2.13',
        '2.14',
        '2.15',
        '2.16',
        '2.17',
        '2.18',
        '2.19',
      ]),
      updatedAt: checkDate,
      title: text,
      scope: text,
      anchors: z.array(id).min(1),
    }),
    entities: z.array(entitySchema).min(1),
    claims: z.array(claimSchema).min(1),
    sources: z.array(sourceSchema).min(1),
    evidence: z.array(evidenceSchema).min(1),
  })
  .superRefine((data, ctx) => {
    const issue = (path: (string | number)[], message: string) =>
      ctx.addIssue({ code: 'custom', path, message });
    for (const collection of [
      'entities',
      'claims',
      'sources',
      'evidence',
    ] as const) {
      const seen = new Set<string>();
      data[collection].forEach((r, i) => {
        if (seen.has(r.id))
          issue([collection, i, 'id'], `Duplicate ID: ${r.id}`);
        seen.add(r.id);
      });
    }
    // Required from schema 2.6; earlier datasets remain readable without it.
    const minor = Number(data.meta.schemaVersion.split('.')[1]);
    const sortNamesRequired = minor >= 6;
    // Required from schema 2.7.
    const languagesRequired = minor >= 7;
    // Quotation limits from schema 2.8 (editorial policy, short quotation).
    const quotationLimitsRequired = minor >= 8;
    // Posed questions and assessment dating from schema 2.10.
    const posedQuestions = minor >= 10;
    // Cross-record proposition roles from schema 2.11.
    const propositionRecords = minor >= 11;
    const propositionCodes = new Set<string>();
    data.entities.forEach((e, i) => {
      if (sortNamesRequired && e.type === 'person' && !e.sortName)
        issue(['entities', i, 'sortName'], `Person needs a sortName: ${e.id}`);
      if (e.type !== 'person' && e.sortName)
        issue(['entities', i, 'sortName'], `sortName is for persons: ${e.id}`);
      // Schema 2.19: a country is keyed by its ISO 3166-1 alpha-2 code.
      if ((e.type === 'country') !== Boolean(e.countryCode))
        issue(
          ['entities', i, 'countryCode'],
          `A country, and only a country, has an ISO 3166-1 code: ${e.id}`,
        );
      if (
        e.type === 'country' &&
        e.countryCode &&
        e.id !== `country-${e.countryCode.toLowerCase()}`
      )
        issue(
          ['entities', i, 'id'],
          `A country's ID is country- and its code: ${e.id}`,
        );
      if (e.datedNames) {
        if (!['organisation', 'public_body'].includes(e.type))
          issue(
            ['entities', i, 'datedNames'],
            'Dated names belong to organisations and public bodies',
          );
        e.datedNames.forEach((n, j) => {
          if (
            n.from &&
            n.until &&
            dateBoundary(n.until, true) < dateBoundary(n.from, false)
          )
            issue(
              ['entities', i, 'datedNames', j],
              'A dated name ends after it begins',
            );
          if (!n.from && !n.until)
            issue(
              ['entities', i, 'datedNames', j],
              'A dated name gives at least one date',
            );
        });
      }
      if (e.proposition) {
        if (e.type !== 'concept')
          issue(['entities', i], `A proposition is a concept: ${e.id}`);
        if (propositionCodes.has(e.proposition.code))
          issue(
            ['entities', i],
            `Duplicate proposition code: ${e.proposition.code}`,
          );
        propositionCodes.add(e.proposition.code);
        const withheld = e.proposition.withheld ?? [];
        if (new Set(withheld.map((w) => w.role)).size !== withheld.length)
          issue(['entities', i], 'A role is withheld at most once');
      }
    });
    const entities = new Map(data.entities.map((r) => [r.id, r]));
    const sources = new Map(data.sources.map((r) => [r.id, r]));
    const claims = new Map(data.claims.map((r) => [r.id, r]));
    const evidence = new Map(data.evidence.map((r) => [r.id, r]));
    const versionKeys = new Set<string>();
    const familyPublishers = new Map<string, string>();
    data.entities.forEach((entity, i) => {
      const version = entity.documentVersion;
      if (!version) return;
      if (entity.type !== 'document')
        issue(['entities', i], 'Version metadata requires a document');
      // Frameworks have organisation publishers; commitment texts, statutes
      // and codes of practice may be issued by public bodies (schema 2.9).
      if (
        !['organisation', 'public_body'].includes(
          entities.get(version.publisherId)?.type ?? '',
        )
      )
        issue(
          ['entities', i],
          'A document version requires an organisation or public-body publisher',
        );
      const priorPublisher = familyPublishers.get(version.family);
      if (priorPublisher && priorPublisher !== version.publisherId)
        issue(
          ['entities', i],
          'A framework family must have one publisher identity',
        );
      familyPublishers.set(version.family, version.publisherId);
      const family = entities.get(version.family);
      if (
        family &&
        (family.type !== 'concept' || family.subtype !== 'Framework family')
      )
        issue(
          ['entities', i],
          'A family referent must be a framework-family concept',
        );
      const key = version.family + ':' + version.label;
      if (versionKeys.has(key))
        issue(['entities', i], 'Duplicate framework version identity');
      versionKeys.add(key);
      if (!version.publishedAt && !version.effectiveAt && !version.revisedAt)
        issue(['entities', i], 'A version needs at least one sourced date');
    });
    data.sources.forEach((source, i) => {
      if (
        source.authorNames &&
        source.authorNames.length !== source.authors.length
      )
        issue(
          ['sources', i, 'authorNames'],
          `authorNames must give one entry per credited author: ${source.id}`,
        );
      if (
        source.publisherId &&
        !['organisation', 'public_body', 'person'].includes(
          entities.get(source.publisherId)?.type ?? '',
        )
      )
        issue(
          ['sources', i],
          'Source publisher identity must identify an institutional or personal author',
        );
      if (
        source.documentId &&
        entities.get(source.documentId)?.type !== 'document'
      )
        issue(['sources', i], 'Source expression requires a document identity');
      if (languagesRequired && !source.language)
        issue(
          ['sources', i, 'language'],
          `Source needs a language: ${source.id}`,
        );
      if (source.archivedAt && !source.archivedUrl)
        issue(
          ['sources', i, 'archivedAt'],
          'A capture date requires an archive URL',
        );
      const wayback = source.archivedUrl?.match(waybackTimestamp);
      if (
        wayback &&
        source.archivedAt &&
        wayback.slice(1, 4).join('-') !== source.archivedAt
      )
        issue(
          ['sources', i, 'archivedAt'],
          'Capture date must match the archive timestamp',
        );
    });
    if (quotationLimitsRequired) {
      // At most 50 words per quote; per source document (edition), the
      // length-scaled limit of maxQuotedWords, with the one-sentence allowance
      // for short texts (2026-10-15). A passage quoted for several claims
      // counts once (clarified in schema 2.11).
      const quoted = new Map<string, string[]>();
      data.evidence.forEach((e, i) => {
        if (e.passageType !== 'quote') return;
        if (wordCount(e.passage) > 50)
          issue(['evidence', i, 'passage'], 'A quote is at most 50 words');
        quoted.set(e.sourceId, [...(quoted.get(e.sourceId) ?? []), e.passage]);
      });
      data.sources.forEach((source, i) => {
        const passages = quoted.get(source.id);
        if (!passages) return;
        const length = source.documentWords?.count;
        if (!length)
          issue(
            ['sources', i, 'documentWords'],
            `A quoted source records its approximate length: ${source.id}`,
          );
        else if (!withinQuotationLimit(length, passages)) {
          const words = [
            ...new Set(passages.map((p) => p.trim().replace(/\s+/g, ' '))),
          ].reduce((n, p) => n + wordCount(p), 0);
          issue(
            ['sources', i],
            `Quoted words (${words}) exceed the limit for a ${length}-word document: ${source.id}`,
          );
        }
      });
    }
    // Only explicit replacement claims create a version chain. Other relations do not.
    const predecessors = new Map<string, string[]>();
    for (const claim of data.claims) {
      if (
        claim.predicate === 'supersedes_document' &&
        claim.object.kind === 'entity'
      ) {
        const prior = predecessors.get(claim.subject) ?? [];
        prior.push(claim.object.entityId);
        predecessors.set(claim.subject, prior);
      }
    }
    const visited = new Set<string>();
    const visiting = new Set<string>();
    const visit = (id: string): boolean => {
      if (visiting.has(id)) return true;
      if (visited.has(id)) return false;
      visiting.add(id);
      for (const prior of predecessors.get(id) ?? [])
        if (visit(prior)) return true;
      visiting.delete(id);
      visited.add(id);
      return false;
    };
    if ([...predecessors.keys()].some(visit))
      issue(['claims'], 'Document supersession cycle');
    data.meta.anchors.forEach((r) => {
      if (!entities.has(r)) issue(['meta', 'anchors'], `Missing anchor ${r}`);
    });
    data.entities.forEach((r, i) => {
      r.sourceIds.forEach((s) => {
        if (!sources.has(s))
          issue(['entities', i, 'sourceIds'], `Missing source ${s}`);
      });
      r.datedNames?.forEach((n, j) =>
        n.sourceIds.forEach((s) => {
          if (!sources.has(s))
            issue(
              ['entities', i, 'datedNames', j, 'sourceIds'],
              `Missing source ${s}`,
            );
        }),
      );
    });
    const comparisonCells = new Set<string>();
    data.claims.forEach((c, i) => {
      const path = ['claims', i];
      const subject = entities.get(c.subject);
      const objectType =
        c.object.kind === 'entity'
          ? entities.get(c.object.entityId)?.type
          : 'literal';
      const p = predicates[c.predicate];
      if (!subject || !(p.subjects as readonly string[]).includes(subject.type))
        issue(
          [...path, 'subject'],
          'Missing or invalid subject type for predicate',
        );
      if (!objectType || !(p.objects as readonly string[]).includes(objectType))
        issue(
          [...path, 'object'],
          'Missing or invalid object type for predicate',
        );
      if (c.object.kind === 'entity' && c.object.entityId === c.subject)
        issue(path, 'Self relationships require editorial schema extension');
      const links = c.evidenceIds.map((e) => evidence.get(e));
      const engagement = c.predicate === 'evaluation_engagement';
      const transition = [
        'separation_announced',
        'name_transition_announced',
      ].includes(c.predicate);
      if (engagement || transition) {
        if (
          c.derivation !== 'explicit' ||
          !links.some(
            (e) => e?.support === 'supports' && e.sourceRole === 'primary',
          )
        )
          issue(
            path,
            'Evaluation and transition records require explicit derivation and supporting primary evidence for the scoped statement',
          );
        if (
          c.attributes?.transactionStage ||
          c.attributes?.transactionType ||
          c.attributes?.amount ||
          c.attributes?.quantity
        )
          issue(
            path,
            'Activity and institutional announcements are not transaction stages or amounts',
          );
      }
      if (engagement) {
        if (
          !c.attributes?.activityStage ||
          !c.attributes.evaluatedSystem ||
          !c.attributes.activityScope
        )
          issue(
            path,
            'Evaluation engagement requires activity stage, evaluated system and activity scope',
          );
        const parties = [
          c.subject,
          ...(c.object.kind === 'entity' ? [c.object.entityId] : []),
        ];
        if (
          !links.some(
            (e) =>
              e?.support === 'supports' &&
              e.sourceRole === 'primary' &&
              parties.includes(sources.get(e.sourceId)?.publisherId ?? ''),
          )
        )
          issue(
            path,
            'Evaluation engagement requires supporting evidence attributed to an identified evaluator or developer publisher',
          );
      } else if (c.attributes?.evaluatedSystem || c.attributes?.activityScope) {
        issue(
          path,
          'Evaluated system and activity scope belong only to evaluation_engagement',
        );
      }
      if (transition) {
        const scope =
          c.predicate === 'separation_announced'
            ? 'separation_announcement'
            : 'name_announcement';
        if (
          c.attributes?.transitionScope !== scope ||
          c.attributes.activityStage !== 'announced'
        )
          issue(
            path,
            'Institutional transitions require announcement-only scope and stage; legal succession is not represented',
          );
        if (
          c.time.kind !== 'unknown' &&
          !(c.time.kind === 'event' && c.time.basis === 'announcement')
        )
          issue(
            path,
            'Institutional transitions require announcement event time or an explicitly unknown date',
          );
      } else if (c.attributes?.transitionScope) {
        issue(
          path,
          'Transition scope belongs only to institutional announcement predicates',
        );
      }
      // Schema 2.15: a prospective appointment, founding credit, departure or
      // organisational change keeps the stage `announced`.
      const announcedStage =
        announcedStagePredicates.has(c.predicate) &&
        c.attributes?.activityStage === 'announced';
      if (
        !engagement &&
        !transition &&
        !announcedStage &&
        c.attributes?.activityStage
      )
        issue(
          path,
          'Activity stage belongs only to evaluation or institutional announcement predicates, or is announced on a personnel or organisational record',
        );
      if (c.predicate === 'uses_method_from') {
        if (c.derivation !== 'explicit' || !c.attributes?.method)
          issue(
            path,
            'Reported method use requires explicit derivation and a named method',
          );
        if (
          !links.some(
            (e) =>
              e?.sourceRole === 'primary' &&
              e.support === 'supports' &&
              (sources.get(e.sourceId)?.documentId === c.subject ||
                subject?.sourceIds.includes(e.sourceId)),
          )
        )
          issue(
            path,
            'Reported method use requires supporting primary evidence from the reporting document',
          );
      } else if (c.attributes?.method) {
        issue(path, 'Method-use attributes belong only to uses_method_from');
      }
      if (['supersedes_document', 'changes_from'].includes(c.predicate)) {
        const later = subject?.documentVersion;
        const earlier =
          c.object.kind === 'entity'
            ? entities.get(c.object.entityId)?.documentVersion
            : undefined;
        if (
          !later ||
          !earlier ||
          later.family !== earlier.family ||
          later.publisherId !== earlier.publisherId
        )
          issue(
            path,
            'Version relations require two versions of the same publisher and framework',
          );
        if (later && earlier) {
          const laterDate =
            later.effectiveAt ?? later.revisedAt ?? later.publishedAt;
          const earlierDate =
            earlier.effectiveAt ?? earlier.revisedAt ?? earlier.publishedAt;
          if (
            laterDate &&
            earlierDate &&
            dateBoundary(laterDate, true) < dateBoundary(earlierDate, false)
          )
            issue(
              path,
              'Version relation must point from later version to predecessor',
            );
        }
      }
      if (c.predicate === 'applies_framework' && c.object.kind === 'entity') {
        const target = entities.get(c.object.entityId);
        if (
          !target?.documentVersion &&
          !(target?.type === 'concept' && target.subtype === 'Framework family')
        )
          issue(
            path,
            'Framework application requires a version or a framework-family referent',
          );
      }
      if (c.predicate === 'changes_from') {
        if (!c.attributes?.changeBasis)
          issue(path, 'Version changes require an evidence mode');
        const comparison = c.attributes?.changeBasis === 'document_comparison';
        if (comparison !== (c.derivation === 'inferred'))
          issue(
            path,
            'Document comparisons must be inferred; publisher change statements must be explicit',
          );
        if (comparison && c.object.kind === 'entity') {
          const sourceVersions = new Set(
            links
              .filter((e) => e?.support === 'supports')
              .map((e) => sources.get(e!.sourceId)?.documentId),
          );
          if (
            !sourceVersions.has(c.subject) ||
            !sourceVersions.has(c.object.entityId)
          )
            issue(
              path,
              'Derived comparison requires supporting evidence from both exact document versions',
            );
        }
      } else if (c.attributes?.changeBasis) {
        issue(
          path,
          'Change evidence mode belongs only to version change claims',
        );
      }
      // Framework provisions (schema 2.8).
      const provision = c.attributes?.provision;
      const provisionClaim = [
        'states_provision',
        'provision_not_found',
      ].includes(c.predicate);
      if (
        provision &&
        !provisionClaim &&
        !['changes_from', 'provision_assessed'].includes(c.predicate)
      )
        issue(
          path,
          'Provision attributes belong only to provision and version change claims',
        );
      if (provisionClaim) {
        const edition = subject?.documentVersion;
        if (!provision)
          issue(path, 'Provision claims require a provision kind and key');
        if (!edition)
          issue(path, 'Provisions belong to an exact framework edition');
        if (c.object.kind !== 'literal' || typeof c.object.value !== 'string')
          issue(path, 'A provision is named by a text label');
        const computed = provision?.computed === true;
        if (computed) {
          // Schema 2.19: dated by the date computed from the quoted rule.
          if (
            c.predicate !== 'states_provision' ||
            c.derivation !== 'inferred' ||
            !c.inferenceRationale ||
            c.time.kind !== 'event' ||
            c.time.basis !== 'effective'
          )
            issue(
              path,
              'A computed date is an inferred provision record with its rationale, dated by the computed effective date',
            );
        } else if (
          c.time.kind !== 'event' ||
          !c.time.basis ||
          c.time.basis === 'announcement' ||
          (edition &&
            ![edition.publishedAt, edition.effectiveAt, edition.revisedAt]
              .filter(Boolean)
              .includes(c.time.date))
        )
          issue(
            path,
            'Provision claims carry one of the edition’s own publication, effective or revision dates',
          );
        const fromEdition = links.filter(
          (e) => e && sources.get(e.sourceId)?.documentId === c.subject,
        );
        if (c.predicate === 'states_provision') {
          if (c.derivation !== 'explicit' && !computed)
            issue(path, 'A stated provision must be explicit in the edition');
          // What the text says is quoted; disputes about what it requires or
          // whether it is adequate are separate assessment records.
          if (c.resolution !== 'supported')
            issue(
              path,
              'A stated provision records the quoted text and is supported; record disagreement as a provision assessment',
            );
          // A comparison question given by paraphrase (schema 2.18) is
          // supported by paraphrases with page locators and quotes nothing.
          const paraphrased =
            facetById(provision?.facet?.id ?? '')?.dimension.passages ===
            'paraphrase';
          if (paraphrased) {
            if (
              !fromEdition.some(
                (e) =>
                  e!.support === 'supports' &&
                  e!.sourceRole === 'primary' &&
                  e!.passageType === 'paraphrase' &&
                  wordCount(e!.passage) <= 50,
              ) ||
              fromEdition.some((e) => e!.passageType === 'quote')
            )
              issue(
                path,
                'A paraphrased comparison cell requires supporting paraphrases of at most 50 words from the cited edition, and no quotation',
              );
          } else if (
            !fromEdition.some(
              (e) =>
                e!.support === 'supports' &&
                e!.sourceRole === 'primary' &&
                e!.passageType === 'quote' &&
                wordCount(e!.passage) <= 50,
            )
          )
            issue(
              path,
              'A stated provision requires a supporting verbatim quote of at most 50 words from the cited edition',
            );
        } else {
          if (c.derivation !== 'inferred')
            issue(
              path,
              'A recorded absence is a negative proposition and must be inferred',
            );
          if (!fromEdition.some((e) => e!.support === 'supports'))
            issue(
              path,
              'A recorded absence requires evidence giving the inspected scope of the cited edition',
            );
        }
      }
      // Framework comparison cells (schema 2.17).
      const facet = provision?.facet;
      if (facet) {
        const definition = facetById(facet.id);
        if (!provisionClaim)
          issue(path, 'A comparison question belongs only to provision claims');
        if (!definition)
          issue(path, `Unknown comparison question: ${facet.id}`);
        else {
          if (provision.kind !== definition.dimension.kind)
            issue(
              path,
              'A comparison cell carries the provision kind of its question',
            );
          if (provision.key !== comparisonKey(facet.id))
            issue(path, 'A comparison cell carries its question’s key');
          if (
            c.object.kind === 'literal' &&
            c.object.value !== definition.label
          )
            issue(path, 'A comparison cell is named by its question’s label');
        }
        if (provision.parties)
          issue(path, 'A comparison cell names no parties');
        if (c.predicate === 'states_provision' && !facet.status)
          issue(path, 'A stated comparison cell records its status');
        if (c.predicate === 'provision_not_found' && facet.status)
          issue(path, 'A recorded absence has no stated status');
        const cell = `${c.subject} ${facet.id}`;
        if (comparisonCells.has(cell))
          issue(path, `One comparison cell per edition and question: ${cell}`);
        comparisonCells.add(cell);
      } else if (provision && isComparisonKey(provision.key))
        issue(path, 'A comparison key belongs only to comparison cells');
      if (c.predicate === 'changes_from' && provision) {
        const stated = (doc: string) =>
          data.claims.some(
            (o) =>
              o.predicate === 'states_provision' &&
              o.subject === doc &&
              o.attributes?.provision?.key === provision.key,
          );
        if (
          c.object.kind !== 'entity' ||
          !stated(c.subject) ||
          !stated(c.object.entityId)
        )
          issue(
            path,
            'A provision change requires the provision to be stated in both inspected editions',
          );
        if (provision.parties)
          issue(path, 'Parties belong to provision claims, not to changes');
      }
      if (
        c.predicate === 'control_assessed' &&
        (c.object.kind !== 'literal' || typeof c.object.value !== 'string')
      )
        issue(path, 'A control assessment is named by a text label');
      if (c.predicate === 'provision_assessed') {
        if (!provision || provision.parties)
          issue(
            path,
            'A provision assessment names the assessed provision by kind and key, without parties',
          );
        if (c.object.kind !== 'literal' || typeof c.object.value !== 'string')
          issue(path, 'A provision assessment is named by a text label');
        if (
          provision &&
          !data.claims.some(
            (o) =>
              o.predicate === 'states_provision' &&
              o.subject === c.subject &&
              o.attributes?.provision?.key === provision.key,
          )
        )
          issue(
            path,
            'A provision assessment requires the assessed provision to be stated in that edition',
          );
      }
      // Participant lists and legislative status (schema 2.19).
      const listing = c.attributes?.listing;
      if (c.predicate === 'lists_participants') {
        if (!listing)
          issue(path, 'A participant list states its count and count basis');
        if (c.object.kind !== 'literal' || typeof c.object.value !== 'string')
          issue(path, 'A participant list is given as a text label');
        if (
          c.derivation !== 'explicit' ||
          !links.some(
            (e) => e?.support === 'supports' && e.sourceRole === 'primary',
          )
        )
          issue(
            path,
            'A participant list is explicit and rests on supporting primary evidence',
          );
        if (!['event', 'snapshot'].includes(c.time.kind))
          issue(path, 'A participant list is dated by its list or its source');
      } else if (listing) {
        issue(path, 'A count of entries belongs only to participant lists');
      }
      if (statusPredicates.has(c.predicate)) {
        if (
          c.derivation !== 'explicit' ||
          !links.some(
            (e) => e?.support === 'supports' && e.sourceRole === 'primary',
          )
        )
          issue(
            path,
            'A legislative or executive status record is explicit and rests on supporting primary evidence',
          );
        if (c.time.kind !== 'event')
          issue(path, 'A legislative or executive status record is an event');
        if (
          c.attributes?.activityStage === 'announced' &&
          !(c.time.kind === 'event' && c.time.basis === 'announcement')
        )
          issue(
            path,
            'An announced revocation is dated by its announcement, not by a formal act',
          );
      }
      // Control structures and external commitments (schema 2.9).
      const controlClaim = [
        'holds_control_right',
        'formed_entity',
        'converted_into',
      ].includes(c.predicate);
      const control = c.attributes?.control;
      if (controlClaim) {
        if (c.predicate !== 'formed_entity' && !control)
          issue(
            path,
            'Control rights and conversions require an instrument and a stage',
          );
        if (c.predicate === 'holds_control_right' && control && !control.right)
          issue(path, 'A control right names the right held');
        if (c.predicate !== 'holds_control_right' && control?.right)
          issue(path, 'Only control-right claims name a right');
        if (control && control.stage !== 'effective') {
          // A plan, announcement or agreement in principle is dated by its
          // announcement, never by an inferred effective date.
          if (
            c.time.kind !== 'unknown' &&
            !(c.time.kind === 'event' && c.time.basis === 'announcement')
          )
            issue(
              path,
              'A planned, announced or agreed arrangement carries its announcement date or an unknown date',
            );
        } else if (
          control &&
          c.time.kind === 'event' &&
          c.time.basis === 'announcement'
        )
          issue(
            path,
            'An effective arrangement is not dated by its announcement',
          );
        if (
          c.predicate === 'formed_entity' &&
          !['event', 'unknown'].includes(c.time.kind)
        )
          issue(path, 'Formation claims require an event or unknown date');
      } else if (control) {
        issue(
          path,
          'Control attributes belong only to control-right, formation and conversion claims',
        );
      }
      const commitment = c.attributes?.commitment;
      const commitmentClaim = [
        'signed_commitment',
        'declined_commitment',
        'references_commitment',
      ].includes(c.predicate);
      if (commitmentClaim) {
        if (
          c.derivation !== 'explicit' ||
          !links.some((e) => e?.support === 'supports')
        )
          issue(
            path,
            'Signatory, refusal and commitment-link records must be explicit and supported',
          );
        if (c.predicate === 'signed_commitment' && !commitment?.stage)
          issue(
            path,
            'A signatory record states whether intent was announced, a signature made or a listing published',
          );
        if (c.predicate !== 'signed_commitment' && commitment?.stage)
          issue(path, 'Only signatory records carry a signing stage');
        if (c.predicate === 'references_commitment') {
          if (!commitment?.link)
            issue(
              path,
              'A commitment link states how the document links itself',
            );
          // The link is the document's own words, quoted from it.
          if (
            !links.some(
              (e) =>
                e?.support === 'supports' &&
                e.sourceRole === 'primary' &&
                e.passageType === 'quote' &&
                (sources.get(e.sourceId)?.documentId === c.subject ||
                  subject?.sourceIds.includes(e.sourceId)),
            )
          )
            issue(
              path,
              'A commitment link requires a supporting quote from the linking document',
            );
        } else if (commitment?.link) {
          issue(path, 'Only commitment links carry a link kind');
        }
        if (
          c.predicate === 'declined_commitment' &&
          !(c.time.kind === 'event' && c.time.basis === 'announcement')
        )
          issue(path, 'A refusal to sign is dated by its announcement');
      } else if (commitment) {
        issue(
          path,
          'Commitment attributes belong only to signatory, refusal and commitment-link claims',
        );
      }
      // Proposition records (schema 2.11): how a text stands to a proposition.
      const thought = c.attributes?.thought;
      const stance =
        propositionStances[c.predicate as keyof typeof propositionStances];
      if (stance) {
        const target =
          c.object.kind === 'entity'
            ? entities.get(c.object.entityId)
            : undefined;
        if (!target?.proposition)
          issue(
            path,
            'A proposition record points to a concept carrying a proposition',
          );
        if (!thought)
          issue(path, 'A proposition record states its roles and register');
        if (c.derivation !== 'explicit' || c.resolution !== 'supported')
          issue(
            path,
            'A proposition record documents what the text says: explicit and supported',
          );
        if (c.time.kind !== 'event')
          issue(path, 'A proposition record is dated by its text');
        if (thought) {
          const roles = new Set<ThoughtRole>(thought.roles);
          const allowed = allowedRoles[stance];
          const main = mainRoles[stance];
          if (roles.size !== thought.roles.length)
            issue(path, 'Duplicate proposition role');
          if (thought.roles.some((r) => !allowed.includes(r)))
            issue(path, 'A role does not match the record’s predicate');
          if (!thought.roles.some((r) => main.includes(r)))
            issue(
              path,
              'A proposition record needs its articulation, contesting or context role',
            );
          if (
            roles.has('articulation') &&
            (roles.has('earliest-located') ||
              roles.has('most-developed') ||
              roles.has('earliest-located-tier-2'))
          )
            issue(
              path,
              'An articulation is neither earliest located nor most developed',
            );
          if ((stance === 'bears_on') !== Boolean(thought.missing))
            issue(
              path,
              'A context record, and only a context record, names the missing element',
            );
          if (roles.has('earliest-located-term') !== Boolean(thought.term))
            issue(
              path,
              'The earliest-located-term role names its term, and only that role does',
            );
          if (thought.term) {
            const term = thought.term.toLowerCase();
            if (
              !target?.proposition?.terms.some((t) => t.toLowerCase() === term)
            )
              issue(path, 'The term is one of the proposition’s usual names');
            if (!links.some((e) => e?.passage.toLowerCase().includes(term)))
              issue(path, 'The term appears in the record’s evidence');
          }
          if (thought.engagement && stance !== 'contests')
            issue(path, 'Engagement belongs only to a contesting record');
          // Schema 2.13: the tier-2 earliest role belongs to a tier-2 text, and
          // a tiered text is earliest located only within tier 1.
          if (roles.has('earliest-located-tier-2') && thought.tier?.value !== 2)
            issue(path, 'The tier-2 earliest located role needs a tier-2 text');
          if (roles.has('earliest-located') && thought.tier?.value === 2)
            issue(path, 'A tier-2 text is earliest located only within tier 2');
          if (
            roles.has('earliest-located-tier-2') &&
            roles.has('earliest-located')
          )
            issue(path, 'A record holds one earliest located role');
          // A retrospective reports an earlier belief in later wording, so an
          // articulation that reports one is never earliest located
          // (2026-10-17).
          if (
            stance === 'articulates' &&
            thought.retrospective &&
            (roles.has('earliest-located') ||
              roles.has('earliest-located-tier-2'))
          )
            issue(path, 'A retrospective articulation is not earliest located');
          if (
            thought.engagement &&
            /[.!?][”"’)]?\s+[A-Z“"]/.test(thought.engagement.rationale)
          )
            issue(path, 'An engagement rationale is one sentence');
          const retro = thought.retrospective;
          if (
            retro?.from &&
            retro.until &&
            dateBoundary(retro.from, false) > dateBoundary(retro.until, true)
          )
            issue(path, 'A reported belief starts before it ends');
          if (c.time.kind === 'event') {
            const reported = retro?.until ?? retro?.from;
            if (
              reported &&
              dateBoundary(reported, false) > dateBoundary(c.time.date, true)
            )
              issue(path, 'A retrospective reports a belief held before it');
            if (
              thought.claimed &&
              dateBoundary(thought.claimed.date, false) >
                dateBoundary(c.time.date, true)
            )
              issue(path, 'A claimed date is not later than the work’s date');
            if (
              thought.attested?.date &&
              dateBoundary(thought.attested.date, true) <
                dateBoundary(c.time.date, false)
            )
              issue(
                path,
                'An attested date is not earlier than the work’s date',
              );
          }
        }
      } else if (thought) {
        issue(path, 'Thought attributes belong only to proposition records');
      }
      if (c.predicate === 'enacted' && c.time.kind !== 'event')
        issue(path, 'Enactment requires an event date');
      const assessment = isAssessment(c);
      if (posedQuestions) {
        // An assessment frames a question that sources take positions on, and
        // an unresolved record has context evidence only: neither is a
        // proposition that a source states.
        if (assessment && c.derivation !== 'posed')
          issue(path, 'An assessment is a question posed by Selekoa');
        if (c.resolution === 'unresolved' && c.derivation === 'explicit')
          issue(
            path,
            'An unresolved record is not stated by a source; record it as posed or inferred',
          );
        if (c.derivation === 'posed' && c.resolution === 'supported')
          issue(
            path,
            'A posed question is contested or unresolved; a settled proposition is explicit or inferred',
          );
        // An interval is a validity period; the publication dates of the
        // sources that discuss a question are not one.
        if (assessment && c.time.kind === 'interval')
          issue(
            path,
            'An assessment is dated by what it assesses or left undated, never by an interval',
          );
      }
      if (assessment) {
        if (c.resolution === 'supported')
          issue(
            path,
            'An assessment is recorded as contested or unresolved, never supported',
          );
        if (
          c.resolution === 'contested' &&
          !(
            links.some((e) => e?.support === 'supports') &&
            links.some((e) => e?.support === 'contradicts')
          )
        )
          issue(path, 'A contested assessment keeps evidence on both sides');
        const publishers = new Set(
          links.map((e) => (e ? sources.get(e.sourceId)?.publisher : '')),
        );
        if (publishers.size < 2)
          issue(
            path,
            'An assessed effect requires sources from at least two publishers',
          );
      }
      if (c.predicate === 'founding_stated') {
        // The object gives the date as the source words it ("late 2013");
        // an event record carries it at the precision stated, and its year
        // must be the one the wording names.
        const value = c.object.kind === 'literal' ? c.object.value : null;
        if (typeof value !== 'string')
          issue(path, 'A stated founding date is a text literal');
        if (c.time.kind !== 'unknown' && c.time.kind !== 'event')
          issue(path, 'A stated founding date is an event or unknown');
        if (
          c.time.kind === 'event' &&
          typeof value === 'string' &&
          !value.includes(c.time.date.slice(0, 4))
        )
          issue(
            path,
            'A stated founding date’s event year must be the year the wording names',
          );
      }
      if (
        ['licensing_hiring_agreement', 'unit_disbanded'].includes(
          c.predicate,
        ) &&
        (c.attributes?.transactionStage ||
          c.attributes?.transactionType ||
          c.attributes?.amount)
      )
        issue(
          path,
          'Licensing-and-hiring agreements and disbanded units carry no transaction stage or amount',
        );
      if (c.predicate === 'licensing_hiring_agreement') {
        if (c.derivation !== 'explicit')
          issue(path, 'A licensing and hiring agreement must be explicit');
        if (!['event', 'unknown'].includes(c.time.kind))
          issue(
            path,
            'A licensing and hiring agreement is dated by its announcement or left unknown',
          );
      }
      const reason = c.attributes?.statedReason;
      if (reason) {
        if (
          !['person', 'organisation'].includes(
            entities.get(reason.by)?.type ?? '',
          )
        )
          issue(
            path,
            'A stated reason names the person or organisation that stated it',
          );
        const passage = evidence.get(reason.evidenceId);
        if (
          !c.evidenceIds.includes(reason.evidenceId) ||
          !passage ||
          passage.support === 'contradicts'
        )
          issue(
            path,
            'A stated reason rests on a supporting or context passage of the same record',
          );
      }
      if (
        c.predicate === 'departure_announced' &&
        (c.time.kind !== 'event' || !c.attributes?.role)
      )
        issue(
          path,
          'Departure announcements require an event date and a specified role',
        );
      if (
        ['co_founded', 'launched', 'acquired'].includes(c.predicate) &&
        !['event', 'unknown'].includes(c.time.kind)
      )
        issue(
          path,
          'Founding, launch and acquisition claims require an event or unknown date',
        );
      if (new Set(c.evidenceIds).size !== c.evidenceIds.length)
        issue(path, 'Duplicate evidence reference');
      links.forEach((e) => {
        if (!e || e.claimId !== c.id)
          issue(path, 'Evidence must exist and link back to this claim');
      });
      const supporting = links.filter((e) => e?.support === 'supports');
      if (c.resolution !== 'unresolved' && !supporting.length)
        issue(
          path,
          'Supported and contested claims require supporting evidence',
        );
      if (
        c.resolution === 'contested' &&
        !links.some((e) => e?.support === 'contradicts')
      )
        issue(path, 'Contested resolution requires counterevidence');
      // Supporting or contradicting evidence makes a record supported or
      // contested; an unresolved question carries context evidence only.
      if (
        c.resolution === 'unresolved' &&
        links.some((e) => e && e.support !== 'context')
      )
        issue(path, 'Unresolved records carry context evidence only');
      if (c.derivation === 'inferred' && !c.inferenceRationale)
        issue(path, 'Inferences require an explicit rationale and premises');
      if (c.derivation !== 'inferred' && c.inferenceRationale)
        issue(
          path,
          'Only inferred claims carry an inference rationale and premises',
        );
      if (
        c.editorialState === 'accepted' &&
        !links.some((e) => e?.verification === 'human_reviewed')
      )
        issue(path, 'Accepted claims require human-reviewed evidence');
      if (c.time.kind === 'interval') {
        if (!c.time.from && !c.time.until)
          issue(path, 'An interval needs a boundary; otherwise use unknown');
        if (
          c.time.from &&
          c.time.until &&
          dateBoundary(c.time.from, false) > dateBoundary(c.time.until, true)
        )
          issue(path, 'Interval ends before it begins');
      }
      if (c.supersedes && (!claims.has(c.supersedes) || c.supersedes === c.id))
        issue(path, 'Invalid supersedes reference');
      const attrs = c.attributes;
      if (attrs?.transactionType) {
        if (!attrs.transactionStage || !attrs.relationshipContext)
          issue(
            path,
            'Typed transactions require stage and relationship context',
          );
        if (!['capital', 'compute'].includes(c.topic))
          issue(path, 'Typed transactions require capital or compute topic');
        if (attrs.quantity && !attrs.quantity.bound)
          issue(path, 'Typed quantities require an explicit bound');
        if (
          attrs.relationshipContext === 'internal' &&
          (attrs.amount ||
            [
              'investment',
              'equity_investment',
              'convertible_debt',
              'funding_round',
              'venture_equity',
              'cloud_services',
            ].includes(attrs.transactionType))
        )
          issue(
            path,
            'Internal resource use is not an external financial transaction',
          );
      }
      if (
        [
          'invested_in',
          'extended_credit_to',
          'compute_capacity',
          'cloud_terms',
          'plans_infrastructure_spend',
          'plans_capacity',
        ].includes(c.predicate) &&
        !attrs?.transactionType
      )
        issue(path, 'Transaction predicates require typed attributes');
      if (
        c.predicate === 'invested_in' &&
        !['invested', 'closed', 'paid', 'completed'].includes(
          attrs?.transactionStage ?? '',
        )
      )
        issue(path, 'Realised investment requires a realised stage');
      if (
        c.predicate === 'investment_announced' &&
        attrs?.transactionType &&
        !['announced', 'committed', 'planned'].includes(
          attrs.transactionStage ?? '',
        )
      )
        issue(path, 'Investment announcement is not a realised investment');
      if (
        ['plans_capacity', 'plans_infrastructure_spend'].includes(
          c.predicate,
        ) &&
        attrs?.transactionStage !== 'planned'
      )
        issue(path, 'Plans require planned stage');
      if (attrs?.amount?.scope === 'round_total' && c.object.kind !== 'literal')
        issue(path, 'Round totals must remain literal claims');
      if (
        c.predicate === 'announced_funding' &&
        attrs?.amount &&
        (attrs.amount.scope !== 'round_total' ||
          c.object.kind !== 'literal' ||
          c.object.value !== attrs.amount.value ||
          c.object.unit !== attrs.amount.currency)
      )
        issue(path, 'Funding literal must match its round total and currency');
      if (c.attributes?.amount && !c.attributes.transactionStage)
        issue(path, 'Amounts require a transaction stage');
      if (
        c.predicate === 'participated_in_round' &&
        c.attributes?.amount?.scope === 'round_total'
      )
        issue(path, 'Do not attribute round total to a participating investor');
      if (c.recordedAt > data.meta.updatedAt)
        issue(path, 'Record date is after dataset update');
    });
    if (propositionRecords) {
      // Roles across the located texts: one earliest located articulation per
      // proposition, decided by the date of its wording (the attested date
      // where the wording survives only in a later copy); at most one most
      // developed record; one earliest located use of a usual name. One record
      // per text, proposition and stance.
      const wording = (c: Claim) => {
        const attested = c.attributes?.thought?.attested;
        if (attested) return attested.date;
        return c.time.kind === 'event' ? c.time.date : undefined;
      };
      const earlier = (a: string, b: string) =>
        dateBoundary(a, true) < dateBoundary(b, false);
      const has = (c: Claim, role: ThoughtRole) =>
        !!c.attributes?.thought?.roles.includes(role);
      const byProposition = new Map<string, Claim[]>();
      const seen = new Set<string>();
      data.claims.forEach((c, i) => {
        if (!(c.predicate in propositionStances) || c.object.kind !== 'entity')
          return;
        const key = [c.subject, c.object.entityId, c.predicate].join('|');
        if (seen.has(key))
          issue(['claims', i], 'One record per text, proposition and stance');
        seen.add(key);
        byProposition.set(c.object.entityId, [
          ...(byProposition.get(c.object.entityId) ?? []),
          c,
        ]);
      });
      for (const [id, list] of byProposition) {
        const proposition = entities.get(id)?.proposition;
        if (!proposition) continue;
        // Schema 2.13: in a tiered collection each rule applies within a
        // tier. Tier-1 and untiered records share the earliest-located role;
        // tier-2 records have their own.
        const tierGroups: [ThoughtRole, Claim[]][] = [
          [
            'earliest-located',
            list.filter((c) => c.attributes?.thought?.tier?.value !== 2),
          ],
          [
            'earliest-located-tier-2',
            list.filter((c) => c.attributes?.thought?.tier?.value === 2),
          ],
        ];
        for (const [role, group] of tierGroups) {
          const tier = role === 'earliest-located' ? '' : ' in tier 2';
          // In a tiered collection a relay record reports a view its author
          // does not state as their own: it never holds earliest located, and
          // its date does not decide which record does (2026-10-16).
          const own = (c: Claim) =>
            !(
              c.attributes?.thought?.register === 'relay' &&
              c.attributes.thought.tier
            );
          for (const c of group)
            if (!own(c) && has(c, role))
              issue(
                ['claims'],
                `${id}: ${c.id} is a relay record and cannot be earliest located`,
              );
          const articulations = group.filter(
            (c) =>
              c.predicate === 'articulates_proposition' &&
              own(c) &&
              !c.attributes?.thought?.retrospective,
          );
          const earliest = articulations.filter((c) => has(c, role));
          // Schema 2.16: a withheld role has no holder until the decision
          // that withheld it is revisited.
          const withheld = proposition.withheld?.some((w) => w.role === role);
          if (withheld && earliest.length)
            issue(
              ['claims'],
              `${id}: the earliest located role${tier} is withheld, so no articulation holds it`,
            );
          if (!withheld && articulations.length && earliest.length !== 1)
            issue(
              ['claims'],
              `${id}: exactly one articulation is earliest located${tier}`,
            );
          if (earliest.length === 1) {
            const date = wording(earliest[0]);
            if (!date)
              issue(
                ['claims'],
                `${id}: the earliest located record needs dated wording`,
              );
            else
              for (const c of articulations) {
                const other = wording(c);
                if (c !== earliest[0] && other && earlier(other, date))
                  issue(
                    ['claims'],
                    `${id}: ${c.id} is dated before the earliest located record${tier}`,
                  );
              }
          }
          // Schema 2.12: at most one earliest located contesting record, under
          // the same date rule as for articulations.
          const contesting = group.filter(
            (c) => c.predicate === 'contests_proposition' && own(c),
          );
          const earliestContest = contesting.filter((c) => has(c, role));
          if (earliestContest.length > 1)
            issue(
              ['claims'],
              `${id}: at most one contesting record is earliest located${tier}`,
            );
          if (earliestContest.length === 1) {
            const date = wording(earliestContest[0]);
            if (!date)
              issue(
                ['claims'],
                `${id}: the earliest located contesting record needs dated wording`,
              );
            else
              for (const c of contesting) {
                const other = wording(c);
                if (c !== earliestContest[0] && other && earlier(other, date))
                  issue(
                    ['claims'],
                    `${id}: ${c.id} is dated before the earliest located contesting record${tier}`,
                  );
              }
          }
        }
        if (list.filter((c) => has(c, 'most-developed')).length > 1)
          issue(['claims'], `${id}: at most one record is most developed`);
        const terms = proposition.terms.map((t) => t.toLowerCase());
        const usesTerm = (c: Claim) =>
          c.evidenceIds.some((e) =>
            terms.some((t) =>
              evidence.get(e)?.passage.toLowerCase().includes(t),
            ),
          );
        const termRecords = list.filter((c) => has(c, 'earliest-located-term'));
        const users = list.filter(usesTerm);
        if (termRecords.length > 1 || (users.length && !termRecords.length))
          issue(
            ['claims'],
            `${id}: exactly one record is the earliest located use of a usual name`,
          );
        if (termRecords.length === 1) {
          const date = wording(termRecords[0]);
          for (const c of users) {
            const other = wording(c);
            if (c !== termRecords[0] && other && date && earlier(other, date))
              issue(
                ['claims'],
                `${id}: ${c.id} uses a usual name before the earliest located term record`,
              );
          }
        }
      }
    }
    data.evidence.forEach((e, i) => {
      if (!claims.get(e.claimId)?.evidenceIds.includes(e.id))
        issue(['evidence', i], 'Orphaned evidence');
      if (!sources.has(e.sourceId)) issue(['evidence', i], 'Missing source');
      if (e.verification === 'human_reviewed' && !e.reviewer)
        issue(['evidence', i], 'Human review requires a reviewer');
      if (e.verification === 'machine_checked' && e.reviewer)
        issue(['evidence', i], 'Machine checks cannot carry a human reviewer');
      if (e.checkedAt > data.meta.updatedAt)
        issue(['evidence', i], 'Evidence checked after dataset update');
      for (const id of e.contextOnly?.claimIds ?? []) {
        if (!claims.has(id))
          issue(['evidence', i], `Required context is not a record: ${id}`);
        if (id === e.claimId)
          issue(['evidence', i], 'Required context is another record');
      }
    });
  });

export type Entity = z.infer<typeof entitySchema>;
export type Claim = z.infer<typeof claimSchema>;
export type Source = z.infer<typeof sourceSchema>;
export type Evidence = z.infer<typeof evidenceSchema>;
export type Dataset = z.infer<typeof datasetSchema>;
