import type { Claim, Dataset, Entity, Evidence, Source } from './schema';
import type { Predicate } from './predicates';
import { dateOf } from './query';
import { provisionKinds } from './document-history';
import { frameworkLabels, frameworkVersions } from './versions';
import type { StopItem } from './control-structures';
import { commitmentCollections } from '../reading/commitments';
import { documentHistories } from '../reading/frontier-safety-frameworks';

/** Stored claims chosen by rule: every listed condition must hold. */
export type RecordMatch = {
  predicates?: Predicate[];
  subjects?: string[];
  objects?: string[];
  resolutions?: Claim['resolution'][];
  except?: string[];
};

export type StarterGroup = {
  title: string;
  claimIds?: string[];
  match?: RecordMatch[];
};

export type StarterGap = {
  id: string;
  /** Short reader-facing area label, such as "Compliance". */
  area: string;
  text: string;
  claimIds: string[];
  /** A candidate research task for maintainers; not shown on the page. */
  task: string;
  /** A list computed from the records, appended to the text. */
  computed?:
    | { kind: 'enacted-laws' }
    | { kind: 'frameworks-without-links' }
    | { kind: 'signatories-without-framework'; textIds: string[] };
};

/**
 * A research question answered only with existing records: a computed
 * chronology, sections of records chosen by stated rules, reused open
 * questions and an explicit list of what the records cannot answer. It
 * carries no connecting prose and draws no conclusion.
 */
export type QuestionStarterDefinition = {
  id: string;
  version: number;
  title: string;
  question: string;
  editorialStatus: 'machine-proposed';
  scope: string;
  /** Developers whose signatures and framework links are listed. */
  organisationIds: string[];
  /** Framework families in scope, by family ID. */
  families: string[];
  /** The earliest recorded edition of each family, in family order. */
  earliestEditionIds: string[];
  /** Key revisions, chosen by the rule stated in the limits. */
  keyRevisionIds: string[];
  /** Commitment texts and laws in scope, in date order. */
  commitmentIds: string[];
  sections: {
    id: string;
    title: string;
    description: string;
    groups: StarterGroup[];
  }[];
  gaps: StarterGap[];
  limits: string[];
};

const targets = (c: Claim, ids: string[]) =>
  c.object.kind === 'entity' && ids.includes(c.object.entityId);

function matches(claim: Claim, m: RecordMatch) {
  return (
    (!m.predicates || m.predicates.includes(claim.predicate)) &&
    (!m.subjects || m.subjects.includes(claim.subject)) &&
    (!m.objects || targets(claim, m.objects)) &&
    (!m.resolutions || m.resolutions.includes(claim.resolution)) &&
    !m.except?.includes(claim.id)
  );
}

const kindIndex = (c: Claim) => {
  const kind = c.attributes?.provision?.kind;
  return kind ? provisionKinds.indexOf(kind) : -1;
};
/** Date order; records on one date keep provision-kind and ID order. */
export const recordOrder = (a: Claim, b: Claim) =>
  (dateOf(a) ?? '9999').localeCompare(dateOf(b) ?? '9999') ||
  kindIndex(a) - kindIndex(b) ||
  a.id.localeCompare(b.id);

/** The stated basis of an event date; other kinds name themselves. */
const basisOf = (claim: Claim) =>
  claim.time.kind === 'event' ? (claim.time.basis ?? 'event') : claim.time.kind;

export type ChronologyKind =
  'issued' | 'announced' | 'enacted' | 'effective' | 'link';

export const chronologyKindLabels: Record<ChronologyKind, string> = {
  issued: 'Issued',
  announced: 'Announced',
  enacted: 'Enacted',
  effective: 'Takes effect',
  link: 'Names a commitment or law',
};

/** The sources behind one claim, supporting evidence first. */
export function claimSources(data: Dataset, claim: Claim) {
  const order = { supports: 0, contradicts: 1, context: 2 } as const;
  return claim.evidenceIds
    .map((id) => data.evidence.find((e) => e.id === id)!)
    .sort((a, b) => order[a.support] - order[b.support])
    .map((evidence) => ({
      evidence,
      source: data.sources.find((s) => s.id === evidence.sourceId)!,
    }));
}

/**
 * Resolve a question starter against the dataset. It returns original Claim
 * objects in a stated order and adds no assertion of its own.
 */
export function questionStarterView(
  data: Dataset,
  definition: QuestionStarterDefinition,
) {
  const entities = new Map(data.entities.map((e) => [e.id, e]));
  const byId = new Map(data.claims.map((c) => [c.id, c]));
  const seen = new Set<string>();
  const take = (claim: Claim) => {
    if (seen.has(claim.id))
      throw new Error('Record listed twice in a question: ' + claim.id);
    seen.add(claim.id);
    return claim;
  };
  for (const id of [
    ...definition.organisationIds,
    ...definition.earliestEditionIds,
    ...definition.keyRevisionIds,
    ...definition.commitmentIds,
  ])
    if (!entities.has(id)) throw new Error('Missing question entity: ' + id);
  const sections = definition.sections.map((section) => ({
    ...section,
    groups: section.groups.map((group) => {
      const explicit = (group.claimIds ?? []).map((id) => {
        const claim = byId.get(id);
        if (!claim) throw new Error('Missing question claim: ' + id);
        return claim;
      });
      const matched = (group.match ?? []).flatMap((m) =>
        data.claims.filter((c) => matches(c, m)),
      );
      const claims = [...new Set([...explicit, ...matched])]
        .sort(recordOrder)
        .map(take);
      if (!claims.length)
        throw new Error('Empty question group: ' + group.title);
      return { title: group.title, claims };
    }),
  }));
  const claimIds = sections.flatMap((s) =>
    s.groups.flatMap((g) => g.claims.map((c) => c.id)),
  );
  const onPage = new Set(claimIds);
  const all = claimIds.map((id) => byId.get(id)!);
  const name = (id: string) => {
    const e = entities.get(id)!;
    return e.shortName ?? e.name;
  };

  // Issue, enactment, entry into force and self-described links, by date.
  const chronology = all
    .flatMap((claim) => {
      const object =
        claim.object.kind === 'entity'
          ? entities.get(claim.object.entityId)
          : undefined;
      if (!object) return [];
      const date = dateOf(claim);
      if (!date) return [];
      if (claim.predicate === 'published')
        return [
          {
            kind: (basisOf(claim) === 'announcement'
              ? 'announced'
              : 'issued') as ChronologyKind,
            date,
            basis: basisOf(claim),
            claim,
            documentId: object.id,
            label: object.name,
          },
        ];
      if (claim.predicate === 'enacted') {
        const effective = object.documentVersion?.effectiveAt;
        return [
          {
            kind: 'enacted' as ChronologyKind,
            date,
            basis: basisOf(claim),
            claim,
            documentId: object.id,
            label: object.name,
          },
          // The effective date is document metadata; the enactment record
          // carries the evidence for it.
          ...(effective
            ? [
                {
                  kind: 'effective' as ChronologyKind,
                  date: effective,
                  basis: 'effective',
                  claim,
                  documentId: object.id,
                  label: object.name,
                },
              ]
            : []),
        ];
      }
      if (claim.predicate === 'references_commitment')
        return [
          {
            kind: 'link' as ChronologyKind,
            date,
            basis: basisOf(claim),
            claim,
            documentId: claim.subject,
            label: `${name(claim.subject)} → ${name(object.id)}`,
          },
        ];
      return [];
    })
    .sort(
      (a, b) =>
        a.date.localeCompare(b.date) ||
        a.label.localeCompare(b.label) ||
        a.claim.id.localeCompare(b.claim.id),
    )
    .map((entry) => {
      const evidence = claimSources(data, entry.claim).map((x) => x.evidence);
      // An entry into force cites the codified history notes or the entry-into-force provision that state it;
      // every other entry cites the claim's supporting evidence.
      const cited =
        entry.kind === 'effective'
          ? evidence.filter(
              (e) =>
                e.support === 'context' &&
                /^(history note|entry into force)/i.test(e.locator),
            )
          : evidence.filter((e) => e.support === 'supports');
      return {
        ...entry,
        evidenceIds: (cited.length ? cited : evidence).map((e) => e.id),
      };
    });

  // Open questions and questions set aside on other pages, where they
  // concern a record listed here. Their text is reused, not rewritten.
  const concerns = (ids: string[]) => ids.some((id) => onPage.has(id));
  const openQuestions = [
    ...commitmentCollections.flatMap((c) =>
      c.openQuestions
        .filter((q) => concerns(q.claimIds))
        .map((q) => ({ id: q.id, text: q.text, claimIds: q.claimIds })),
    ),
    ...documentHistories.flatMap((c) =>
      c.openQuestions
        .filter((q) => concerns(q.claimIds))
        .map((q) => ({ id: q.id, text: q.text, claimIds: q.claimIds })),
    ),
  ];
  const setAside: StopItem[] = commitmentCollections.flatMap((c) =>
    c.stops.filter((s) => concerns(s.claimIds)),
  );

  const families = definition.families.map((family) => ({
    family,
    label: frameworkLabels[family] ?? family,
    editions: frameworkVersions(data, family),
  }));
  const gaps = definition.gaps.map((gap) => {
    for (const id of gap.claimIds)
      if (!byId.has(id)) throw new Error('Missing gap claim: ' + id);
    let detail: { text: string; claimIds: string[] } | null = null;
    if (gap.computed?.kind === 'enacted-laws') {
      const enacted = data.claims.filter((c) => c.predicate === 'enacted');
      detail = {
        text:
          'Enacted laws recorded in Selekoa: ' +
          enacted
            .map((c) =>
              c.object.kind === 'entity' ? name(c.object.entityId) : '',
            )
            .join('; ') +
          '.',
        claimIds: enacted.map((c) => c.id),
      };
    }
    if (gap.computed?.kind === 'frameworks-without-links') {
      const unlinked = families.filter(
        (f) =>
          !data.claims.some(
            (c) =>
              c.predicate === 'references_commitment' &&
              f.editions.some((e) => e.id === c.subject) &&
              targets(c, definition.commitmentIds),
          ),
      );
      detail = {
        text: unlinked.length
          ? 'Frameworks with no edition recorded as naming any of these texts: ' +
            unlinked.map((f) => f.label).join('; ') +
            '.'
          : 'Every framework in scope has at least one recorded link.',
        claimIds: data.claims
          .filter(
            (c) =>
              c.predicate === 'published' &&
              unlinked.some((f) => f.editions.some((e) => targets(c, [e.id]))),
          )
          .sort(recordOrder)
          .map((c) => c.id),
      };
    }
    if (gap.computed?.kind === 'signatories-without-framework') {
      // Organisations listed for the named texts, other than the developers
      // whose frameworks are recorded here.
      const asking = gap.computed.textIds;
      const listed = data.claims
        .filter(
          (c) =>
            c.predicate === 'signed_commitment' &&
            targets(c, asking) &&
            !definition.organisationIds.includes(c.subject),
        )
        .sort(
          (a, b) =>
            name(a.subject).localeCompare(name(b.subject), 'en', {
              sensitivity: 'base',
            }) || recordOrder(a, b),
        );
      const organisations = [...new Set(listed.map((c) => c.subject))];
      detail = {
        text: organisations.length
          ? `Organisations listed as signatories of ${asking.map(name).join(' or ')} with no framework recorded here: ` +
            organisations.map(name).join(', ') +
            '.'
          : 'Every listed signatory has a framework recorded here.',
        claimIds: listed.map((c) => c.id),
      };
    }
    return { ...gap, detail };
  });

  return {
    definition,
    sections,
    chronology,
    openQuestions,
    setAside,
    gaps,
    claimIds,
    disputed: all.filter((c) => c.resolution !== 'supported'),
    documentIds: [
      ...new Set(
        all.flatMap((c) => [
          c.subject,
          ...(c.object.kind === 'entity' ? [c.object.entityId] : []),
        ]),
      ),
    ].filter((id) => entities.get(id)?.type === 'document'),
  };
}

export type QuestionStarterView = ReturnType<typeof questionStarterView>;
export type ChronologyEntry = QuestionStarterView['chronology'][number];
export type { Entity, Evidence, Source };
