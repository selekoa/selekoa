import type { Claim, Dataset, Entity, Evidence, Source } from './schema';
import {
  documentHistory,
  editionGapText,
  provisionKindLabels,
  type DocumentHistoryCollection,
} from './document-history';
import { canonicalJson, fingerprint, md, sourceReference } from './references';
import { reviewStatus, reviewStatusSentences } from './review-status';
import { referencePath } from './deep-links';
import { timeLabel } from './query';
import { versionDescription } from './versions';
import { personProfile } from './person-profile';
import { predicates } from './predicates';

const changeBasisLabels = {
  publisher_statement: 'stated by the publisher',
  changelog: 'official changelog',
  document_comparison: 'inferred by comparing editions',
  assessment: 'assessed effect, not a finding',
} as const;

const summaryBasisLabels = {
  publisher_statement: 'Publisher statement',
  changelog: 'Official changelog',
  document_comparison: 'Inferred by comparing editions',
  assessment: 'Assessed effect (not a finding)',
} as const;

/** Limits a reader needs before the details; the rest close the Markdown export. */
export const keyLimits = [
  'This research starter is a starting point for checking the exact claims and original documents you rely on. It is not a finding.',
  'A machine proposed the selection, the order and any connecting text. No human review of the selection, source paths or framing is recorded.',
];
export const limits = [
  ...keyLimits,
  'Each claim’s editorial status and each evidence record’s check status are copied from the dataset and kept separate. “Supported” does not mean that no contrary evidence exists.',
  'Passages are included only as stored editorial paraphrases, or as short quotes from sources whose recorded reuse note permits attributed excerpts or short attributed quotations. Other quotes are omitted. Original documents are never included. Each source’s reuse note travels with it and describes Selekoa’s practice, not the publisher’s terms.',
  'Fingerprints identify the complete loaded dataset and collection definition using canonical JSON (sorted object keys, preserved array order, UTF-8) and SHA-256. The starter is a subset and cannot reconstruct the full dataset.',
  'An access date, a current URL or an archive URL does not prove what an earlier version of a document said. Inspect the exact original edition before relying on it in academic or journalistic work.',
];

/** Short quotes travel only where the stored reuse note permits them. */
export function quotationPermitted(source: Source) {
  return /excerpt|short attributed quotations/i.test(source.reuse.note);
}
function passagePermitted(evidence: Evidence, source: Source) {
  return evidence.passageType === 'paraphrase' || quotationPermitted(source);
}

/** Evidence for the given claims, with passages limited by reuse notes. */
function starterEvidence(data: Dataset, claims: Claim[]) {
  const sourceMap = new Map(data.sources.map((s) => [s.id, s]));
  return claims.flatMap((claim) =>
    claim.evidenceIds.map((id) => {
      const item = data.evidence.find((e) => e.id === id);
      if (!item || item.claimId !== claim.id)
        throw new Error('Missing or mismatched evidence: ' + id);
      const source = sourceMap.get(item.sourceId);
      if (!source) throw new Error('Missing source: ' + item.sourceId);
      const { passage, ...record } = item;
      return passagePermitted(item, source)
        ? { ...record, passage, passageIncluded: true as const }
        : {
            ...record,
            passageIncluded: false as const,
            passageOmissionReason:
              'Quote omitted: the source reuse note does not record permission for excerpts. Inspect the original at the stored locator.',
          };
    }),
  );
}
type StarterEvidence = ReturnType<typeof starterEvidence>;

/** Claims, their evidence, endpoints and sources: the shared starter core. */
export function starterRecords(
  data: Dataset,
  claimIds: string[],
  extraEntityIds: string[],
  extraSourceIds: string[],
) {
  const byId = new Map(data.claims.map((c) => [c.id, c]));
  const claims = claimIds.map((id) => {
    const claim = byId.get(id);
    if (!claim) throw new Error('Missing starter claim: ' + id);
    return claim;
  });
  const evidence = starterEvidence(data, claims);
  const entityIds = new Set([
    ...extraEntityIds,
    ...claims.flatMap((c) => [
      c.subject,
      ...(c.object.kind === 'entity' ? [c.object.entityId] : []),
    ]),
  ]);
  const sourceMap = new Map(data.sources.map((s) => [s.id, s]));
  const sourceIds = new Set([
    ...evidence.map((e) => e.sourceId),
    ...extraSourceIds,
  ]);
  const disputed = claims.filter((c) => c.resolution !== 'supported');
  const counterevidence = evidence.filter((e) => e.support === 'contradicts');
  return {
    claims,
    evidence,
    entities: data.entities.filter((e) => entityIds.has(e.id)),
    sources: [...sourceIds].sort().map((id) => sourceMap.get(id)!),
    disagreements: {
      contestedOrUnresolvedClaimIds: disputed.map((c) => c.id),
      counterevidenceIds: counterevidence.map((e) => e.id),
      note:
        disputed.length || counterevidence.length
          ? 'Contested and unresolved records retain all linked evidence.'
          : 'No contested or unresolved claim and no contradicting evidence is recorded in this selection. This describes the recorded evidence only. It is not a finding that no contradiction exists.',
    },
    inferences: claims
      .filter((c) => c.derivation === 'inferred')
      .map((c) => ({ claimId: c.id, rationale: c.inferenceRationale! })),
  };
}

export async function documentHistoryStarter(
  data: Dataset,
  collection: DocumentHistoryCollection,
) {
  const history = documentHistory(data, collection);
  const records = starterRecords(
    data,
    history.claimIds,
    history.families.flatMap((f) => [
      f.publisher.id,
      ...(f.referent ? [f.referent.id] : []),
      ...f.editions.map((e) => e.entity.id),
    ]),
    history.families.flatMap((f) =>
      f.editions.flatMap((e) => e.sources.map((s) => s.id)),
    ),
  );
  const starter = {
    format: 'selekoa-research-starter',
    formatVersion: 1,
    dataset: { metadata: data.meta, fingerprint: await fingerprint(data) },
    collection: {
      definition: collection,
      fingerprint: await fingerprint(collection),
      interpretationStatus:
        'machine-proposed; not human-reviewed or editorially accepted',
      orderedClaimIds: history.claimIds,
    },
    reviewStatus: reviewStatus(data, history.claimIds),
    families: history.families.map((f) => ({
      family: f.family,
      label: f.label,
      publisherId: f.publisher.id,
      referentId: f.referent?.id ?? null,
      referentClaimIds: f.referentClaims.map((c) => c.id),
      editions: f.editions.map((e) => ({
        documentId: e.entity.id,
        documentVersion: e.entity.documentVersion!,
        issuedClaimIds: e.issued.map((c) => c.id),
        replacesClaimIds: e.replaces.map((c) => c.id),
        replacedByClaimIds: e.replacedBy.map((c) => c.id),
        changeClaimIds: e.changes.map((c) => c.id),
        provisionClaimIds: e.provisions.map((c) => c.id),
        absenceClaimIds: e.absences.map((c) => c.id),
        assessmentClaimIds: e.assessments.map((c) => c.id),
        appliesClaimIds: e.applies.map((c) => c.id),
        creditClaimIds: e.credits.map((c) => c.id),
        commitmentLinkClaimIds: e.commitmentLinks.map((c) => c.id),
        exactTextSourceIds: e.sources.map((s) => s.id),
        coverageGaps: e.gaps.map((gap) => ({
          gap,
          text: editionGapText[gap],
        })),
      })),
      openQuestionIds: f.openQuestions.map((q) => q.id),
      provisionKeys: f.provisionKeys.map((row) => ({
        key: row.key,
        kind: row.kind,
        label: row.label,
        wordings: row.wordings.map((w) => ({
          label: w.label,
          documentIds: w.editionIds,
        })),
        editions: row.editions.map((cell) => ({
          documentId: cell.editionId,
          statedClaimId: cell.stated?.id ?? null,
          absentClaimId: cell.absent?.id ?? null,
          assessmentClaimIds: cell.assessed.map((c) => c.id),
        })),
      })),
    })),
    disagreements: records.disagreements,
    inferences: records.inferences,
    openQuestions: collection.openQuestions,
    claims: records.claims,
    evidence: records.evidence,
    sources: records.sources,
    entities: records.entities,
    limits,
  };
  // Snapshot so later caller mutations cannot change the export.
  return JSON.parse(canonicalJson(starter)) as typeof starter;
}

export type ResearchStarter = Awaited<
  ReturnType<typeof documentHistoryStarter>
>;

/** Pretty JSON with a final newline, for any starter. */
export function starterJson(starter: object) {
  return JSON.stringify(starter, null, 2) + '\n';
}

/** One table cell: Markdown-escaped, on a single line. */
export const cell = (text: string) => md(text).replace(/\s*\n\s*/g, ' ');

function dateAndBasis(version: Entity['documentVersion'] & {}) {
  const dates = [
    version.effectiveAt && 'effective ' + version.effectiveAt,
    version.revisedAt && 'revised ' + version.revisedAt,
    version.publishedAt
      ? 'published ' + version.publishedAt
      : 'publication day not established',
  ].filter(Boolean);
  return dates.join('; ');
}

export type StarterBase = {
  claims: Claim[];
  evidence: StarterEvidence;
  sources: Source[];
  disagreements: ReturnType<typeof starterRecords>['disagreements'];
  inferences: ReturnType<typeof starterRecords>['inferences'];
};

/** One stored claim with its dates, states and permitted evidence passages. */
export function claimBlockLines(
  starter: StarterBase,
  claim: Claim,
  heading: string,
) {
  const sources = new Map(starter.sources.map((s) => [s.id, s]));
  const lines = [
    `##### ${heading}: ${claim.id}`,
    '',
    md(claim.statement),
    '',
    `- Date: ${timeLabel(claim)}. ${md(claim.time.note)}`,
    `- Qualification: ${md(claim.qualification)}`,
    `- Derivation: ${claim.derivation}; resolution: ${claim.resolution}; editorial state: ${claim.editorialState}.`,
  ];
  if (claim.attributes?.changeBasis)
    lines.push(
      `- Change evidence: ${changeBasisLabels[claim.attributes.changeBasis]}.`,
    );
  if (claim.inferenceRationale)
    lines.push(`- Inference rationale: ${md(claim.inferenceRationale)}`);
  lines.push(
    `- Application link (relative to an installed Selekoa): ${referencePath({ kind: 'claim', id: claim.id })}`,
    '',
  );
  for (const e of starter.evidence.filter((e) => e.claimId === claim.id)) {
    const source = sources.get(e.sourceId)!;
    lines.push(
      `Evidence ${e.id} · ${e.sourceRole} source · ${e.support} · ${e.verification === 'human_reviewed' ? 'human-reviewed by ' + md(e.reviewer ?? '') : 'machine-checked'} ${e.checkedAt}`,
      '',
      `Source: ${md(source.title)} (${source.id}). Locator: ${md(e.locator)}`,
      '',
    );
    if (e.passageIncluded)
      lines.push(
        e.passageType === 'quote'
          ? '> ' + md(e.passage)
          : 'Paraphrase: ' + md(e.passage),
        '',
      );
    else lines.push(md(e.passageOmissionReason), '');
    if (e.contextOnly) lines.push(md(contextOnlyLine(e.contextOnly)), '');
  }
  return lines;
}

/** How an export states the context a context-only passage needs. */
export function contextOnlyLine(c: { requires: string; claimIds?: string[] }) {
  return `Shown only with its context: ${c.requires}${c.claimIds?.length ? ` Records that give it: ${c.claimIds.join(', ')}.` : ''}`;
}

/** Disagreements, inferences and source metadata, shared by every starter. */
export function closingLines(starter: StarterBase) {
  const lines = ['## Disagreements', '', md(starter.disagreements.note), ''];
  if (starter.disagreements.contestedOrUnresolvedClaimIds.length) {
    lines.push(
      'Contested or unresolved claims: ' +
        starter.disagreements.contestedOrUnresolvedClaimIds.join(', '),
      '',
    );
    // Each disputed record with its evidence grouped by side; no side is chosen.
    const sources = new Map(starter.sources.map((s) => [s.id, s]));
    const sides = [
      ['supports', 'Supporting'],
      ['contradicts', 'Contradicting'],
      ['context', 'Context'],
    ] as const;
    for (const id of starter.disagreements.contestedOrUnresolvedClaimIds) {
      const claim = starter.claims.find((c) => c.id === id)!;
      lines.push(`- ${id} (${claim.resolution}): ${md(claim.statement)}`);
      for (const [side, label] of sides) {
        const items = starter.evidence.filter(
          (e) => e.claimId === id && e.support === side,
        );
        if (items.length)
          lines.push(
            `  - ${label}: ` +
              items
                .map(
                  (e) =>
                    `${md(sources.get(e.sourceId)!.publisher)}, ${e.sourceRole} (${e.id})`,
                )
                .join('; '),
          );
      }
    }
    lines.push('');
  }
  if (starter.disagreements.counterevidenceIds.length)
    lines.push(
      'Counterevidence: ' + starter.disagreements.counterevidenceIds.join(', '),
      '',
    );
  lines.push('## Inferences', '');
  if (starter.inferences.length)
    for (const i of starter.inferences)
      lines.push(`- ${i.claimId}: ${md(i.rationale)}`);
  else lines.push('No inferred claim is included.');
  lines.push('', '## Source metadata', '');
  for (const s of starter.sources) {
    lines.push(
      '### ' + s.id,
      '',
      md(sourceReference(s)),
      '',
      'Attribution: ' + md(s.reuse.attribution),
      '',
      'Reuse: ' + md(s.reuse.licence + '. ' + s.reuse.note),
      '',
    );
  }
  return lines;
}

export function starterMarkdown(starter: ResearchStarter) {
  const collection = starter.collection.definition;
  const claims = new Map(starter.claims.map((c) => [c.id, c]));
  const entities = new Map(starter.entities.map((e) => [e.id, e]));
  const sources = new Map(starter.sources.map((s) => [s.id, s]));
  const versionLabel = (claimId: string) => {
    const claim = claims.get(claimId)!;
    const target =
      claim.object.kind === 'entity'
        ? entities.get(claim.object.entityId)
        : undefined;
    return target?.documentVersion?.label ?? target?.name ?? '';
  };
  const summary = starter.families.flatMap((family) =>
    family.editions.map((edition, index) => {
      const replaces = edition.replacesClaimIds.map(versionLabel);
      const changes = edition.changeClaimIds.map((id) => {
        const claim = claims.get(id)!;
        const basis = claim.attributes?.changeBasis;
        return (
          (basis ? summaryBasisLabels[basis] + ': ' : '') + claim.statement
        );
      });
      return [
        family.label,
        edition.documentVersion.label +
          (replaces.length ? ' (replaces ' + replaces.join(', ') + ')' : ''),
        dateAndBasis(edition.documentVersion),
        edition.exactTextSourceIds
          .map((id) => sources.get(id)!)
          .map(
            (s) =>
              `[${cell(s.title)}](<${s.evidenceUrl.replaceAll('|', '%7C')}>)` +
              (s.archivedUrl
                ? ` ([archived copy${s.archivedAt ? ', captured ' + s.archivedAt : ''}](<${s.archivedUrl.replaceAll('|', '%7C')}>))`
                : ''),
          )
          .join('; ') || 'No exact-text source recorded',
        changes.length
          ? changes.join(' · ')
          : index === 0
            ? 'Earliest edition recorded here'
            : 'None recorded (a gap in coverage; it does not mean nothing changed)',
      ];
    }),
  );
  const lines = [
    '# ' + md(collection.title) + ': research starter',
    '',
    `A machine-proposed starting point for independent checking. It is not a finding. Collection ${collection.id}, version ${collection.version}; dataset updated ${starter.dataset.metadata.updatedAt}. Fingerprints and technical notes are at the end.`,
    '',
    '## Summary',
    '',
    'One row per recorded edition, oldest first within each framework. Each date keeps its stated basis. Recorded changes are selected, sourced differences from the previous edition.',
    '',
    '| Framework | Edition | Date and basis | Source | Recorded changes |',
    '| --- | --- | --- | --- | --- |',
    ...summary.map(
      ([family, edition, date, source, changes]) =>
        `| ${cell(family)} | ${cell(edition)} | ${cell(date)} | ${source} | ${cell(changes)} |`,
    ),
    '',
    '## Key limits',
    '',
    // The first two collection limits are its framing limits: publication is
    // not implementation, and recorded changes are a selection.
    ...[...keyLimits, ...collection.limits.slice(0, 2)].map(
      (s) => '- ' + md(s),
    ),
    '',
    '## Research question',
    '',
    md(collection.question),
    '',
    md(collection.introduction),
    '',
    '## Review status of these records',
    '',
    ...reviewStatusSentences(starter.reviewStatus).map((s) => '- ' + md(s)),
    '',
  ];
  const claimBlock = (claim: Claim, heading: string) =>
    lines.push(...claimBlockLines(starter, claim, heading));
  lines.push('## Document histories', '');
  for (const family of starter.families) {
    lines.push(
      '### ' + md(family.label),
      '',
      `Publisher: ${md(entities.get(family.publisherId)!.name)}. ${family.editions.length} recorded edition${family.editions.length === 1 ? '' : 's'}, oldest first.`,
      '',
    );
    for (const edition of family.editions) {
      const entity = entities.get(edition.documentId)!;
      lines.push(
        '#### ' + md(entity.name),
        '',
        md(versionDescription(entity)),
        '',
        'Date note: ' + md(edition.documentVersion.dateNote),
        '',
      );
      if (edition.exactTextSourceIds.length)
        lines.push(
          'Exact edition text: ' +
            edition.exactTextSourceIds
              .map((id) => {
                const s = sources.get(id)!;
                return (
                  `${md(s.title)} <${s.evidenceUrl}>` +
                  (s.archivedUrl
                    ? ` (archived copy${s.archivedAt ? ', captured ' + s.archivedAt : ''}: <${s.archivedUrl}>)`
                    : '')
                );
              })
              .join('; '),
          '',
        );
      for (const gap of edition.coverageGaps)
        lines.push('Coverage gap: ' + md(gap.text), '');
      const groups: [string, string[]][] = [
        ['Issued', edition.issuedClaimIds],
        ['Replaces', edition.replacesClaimIds],
        ['Recorded change', edition.changeClaimIds],
        ['Applies', edition.appliesClaimIds],
        ['Credits', edition.creditClaimIds],
        ['Links itself to a commitment', edition.commitmentLinkClaimIds],
      ];
      for (const [heading, ids] of groups)
        for (const id of ids) claimBlock(claims.get(id)!, heading);
      for (const id of [
        ...edition.provisionClaimIds,
        ...edition.absenceClaimIds,
        ...edition.assessmentClaimIds,
      ]) {
        const claim = claims.get(id)!;
        const kind =
          provisionKindLabels[claim.attributes!.provision!.kind].toLowerCase();
        claimBlock(
          claim,
          claim.predicate === 'provision_not_found'
            ? `Recorded absence (${kind})`
            : claim.predicate === 'provision_assessed'
              ? `Disputed assessment of a provision (${kind})`
              : `Provision (${kind})`,
        );
      }
    }
    const referentOnly = family.referentClaimIds.filter(
      (id) => !family.editions.some((e) => e.appliesClaimIds.includes(id)),
    );
    for (const id of referentOnly)
      claimBlock(claims.get(id)!, 'Family reference');
    const questions = starter.openQuestions.filter(
      (q) => q.family === family.family,
    );
    if (questions.length) {
      lines.push('#### Open questions', '');
      for (const q of questions)
        lines.push(
          `- ${md(q.text)} (${q.id}; claims: ${q.claimIds.join(', ')})`,
        );
      lines.push('');
    }
  }
  lines.push(...closingLines(starter));
  const shown = new Set<string>([
    ...keyLimits,
    ...collection.limits.slice(0, 2),
  ]);
  lines.push(
    '## Further limits and technical notes',
    '',
    ...[...starter.limits, ...collection.limits]
      .filter((s) => !shown.has(s))
      .map((s) => '- ' + md(s)),
    '',
    `Collection: ${collection.id} · version ${collection.version} · ${starter.collection.interpretationStatus}`,
    `Collection fingerprint: ${starter.collection.fingerprint}`,
    `Dataset: ${md(starter.dataset.metadata.title)} · schema ${starter.dataset.metadata.schemaVersion} · updated ${starter.dataset.metadata.updatedAt}`,
    `Dataset fingerprint: ${starter.dataset.fingerprint}`,
  );
  return lines.join('\n').trimEnd() + '\n';
}

/** Version of the fixed rules that compute a person projection. */
export const personProjectionVersion = 1;

const personKeyLimits = [
  keyLimits[0],
  'Sections and order are computed from stored claims by fixed rules (projection version ' +
    personProjectionVersion +
    '). No person selected or reviewed them, and no connecting text is added.',
  'One record following another does not mean one role led to the next. Nothing here records why a person moved. A snapshot is not a tenure, and a missing end date is unknown. It does not mean the appointment continued.',
];

/** A research starter for one person page, reusing the shared starter core. */
export async function personStarter(data: Dataset, personId: string) {
  const profile = personProfile(data, personId);
  if (!profile) throw new Error('Not a person: ' + personId);
  const records = starterRecords(
    data,
    profile.claimIds,
    [personId],
    profile.person.sourceIds,
  );
  const sections = {
    pathClaimIds: profile.path.map((e) => e.claim.id),
    undatedClaimIds: profile.undated.map((e) => e.claim.id),
    workClaimIds: profile.works.map((c) => c.id),
    creditClaimIds: profile.creditsTo.map((c) => c.id),
    governanceClaimIds: profile.governance.map((c) => c.id),
    otherClaimIds: profile.other.map((c) => c.id),
  };
  const starter = {
    format: 'selekoa-research-starter',
    formatVersion: 1,
    dataset: { metadata: data.meta, fingerprint: await fingerprint(data) },
    person: {
      entityId: personId,
      projectionVersion: personProjectionVersion,
      interpretationStatus:
        'machine-computed projection of stored claims; not human-reviewed or editorially accepted',
      orderedClaimIds: profile.claimIds,
      identitySourceIds: profile.person.sourceIds,
      sections,
      cannotTell: profile.gaps,
    },
    reviewStatus: reviewStatus(data, profile.claimIds),
    disagreements: records.disagreements,
    inferences: records.inferences,
    claims: records.claims,
    evidence: records.evidence,
    sources: records.sources,
    entities: records.entities,
    limits: [...personKeyLimits, ...limits.slice(2)],
  };
  // Snapshot so later caller mutations cannot change the export.
  return JSON.parse(canonicalJson(starter)) as typeof starter;
}

export type PersonStarter = Awaited<ReturnType<typeof personStarter>>;

export function personStarterMarkdown(starter: PersonStarter) {
  const claims = new Map(starter.claims.map((c) => [c.id, c]));
  const entities = new Map(starter.entities.map((e) => [e.id, e]));
  const sources = new Map(starter.sources.map((s) => [s.id, s]));
  const person = entities.get(starter.person.entityId)!;
  const { sections } = starter.person;
  const counterpart = (claim: Claim) =>
    claim.object.kind === 'entity'
      ? (entities.get(claim.object.entityId)?.name ?? '')
      : String(claim.object.value);
  const documentedIn = (claim: Claim) =>
    [
      ...new Set(
        starter.evidence
          .filter((e) => e.claimId === claim.id)
          .map((e) => sources.get(e.sourceId)!.publicationDate ?? 'unknown'),
      ),
    ].join('; ');
  const tableHead = [
    '| Date | Relation | Institution | Record | Documented in (source publication) |',
    '| --- | --- | --- | --- | --- |',
  ];
  const pathRow = (id: string) => {
    const claim = claims.get(id)!;
    const role = claim.attributes?.role ? ' · ' + claim.attributes.role : '';
    return `| ${cell(timeLabel(claim))} | ${cell(predicates[claim.predicate].label + role)} | ${cell(counterpart(claim))} | ${cell(claim.statement)} | ${cell(documentedIn(claim))} |`;
  };
  const lines = [
    '# ' + md(person.name) + ': research starter',
    '',
    `A machine-computed starting point for independent checking. It is not a finding or a biography. Person ${person.id}; projection version ${starter.person.projectionVersion}; dataset updated ${starter.dataset.metadata.updatedAt}. Fingerprints and technical notes are at the end.`,
    '',
    md(person.description),
    '',
    '## Documented path',
    '',
    'Roles, founding, launches and departures in date order. A snapshot is one dated report, not a tenure. An interval keeps only the start and end its source states.',
    '',
  ];
  if (sections.pathClaimIds.length)
    lines.push(...tableHead, ...sections.pathClaimIds.map(pathRow), '');
  else lines.push('No dated role, founding or departure record.', '');
  if (sections.undatedClaimIds.length)
    lines.push(
      '### Undated',
      '',
      'No defensible date; not placed in sequence.',
      '',
      ...tableHead,
      ...sections.undatedClaimIds.map(pathRow),
      '',
    );
  lines.push(
    '## Key limits',
    '',
    ...personKeyLimits.map((s) => '- ' + md(s)),
    '',
    '## What this record cannot tell you',
    '',
    ...starter.person.cannotTell.map(
      (g) => `- ${md(g.text)} (claims: ${g.claimIds.join(', ')})`,
    ),
    '',
    '## Review status of these records',
    '',
    ...reviewStatusSentences(starter.reviewStatus).map((s) => '- ' + md(s)),
    '',
    '## Records',
    '',
  );
  const groups: [string, string, string[]][] = [
    ['Documented path', 'Path', sections.pathClaimIds],
    ['Undated', 'Undated', sections.undatedClaimIds],
    ['Works authored', 'Authored', sections.workClaimIds],
    ['Credits to this person', 'Credit', sections.creditClaimIds],
    ['Governance records', 'Governance', sections.governanceClaimIds],
    ['Other recorded relations', 'Other', sections.otherClaimIds],
  ];
  for (const [title, heading, ids] of groups) {
    if (!ids.length) continue;
    lines.push('### ' + title, '');
    for (const id of ids)
      lines.push(...claimBlockLines(starter, claims.get(id)!, heading));
  }
  lines.push(
    ...closingLines(starter),
    '## Identity sources',
    '',
    ...starter.person.identitySourceIds.map(
      (id) => `- ${md(sources.get(id)!.title)} (${id})`,
    ),
    '',
    '## Further limits and technical notes',
    '',
    ...starter.limits
      .filter((s) => !personKeyLimits.includes(s))
      .map((s) => '- ' + md(s)),
    '',
    `Person projection: ${person.id} · version ${starter.person.projectionVersion} · ${starter.person.interpretationStatus}`,
    `Dataset: ${md(starter.dataset.metadata.title)} · schema ${starter.dataset.metadata.schemaVersion} · updated ${starter.dataset.metadata.updatedAt}`,
    `Dataset fingerprint: ${starter.dataset.fingerprint}`,
  );
  return lines.join('\n').trimEnd() + '\n';
}
