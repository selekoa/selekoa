import { questionStarters } from '../reading/self-governance';
import { questionStarterView } from './question-starter';
import type { Dataset } from './schema';
import { dateOf } from './query';
import { reviewStatus } from './review-status';
import { documentHistory } from './document-history';
import { controlStructure } from './control-structures';
import { commitmentsView } from './commitments';
import { institutionalDossier } from './dossier';
import { peopleIndex } from './people-index';
import { researchPaths } from './research-path';
import { frontierSafetyFrameworks } from '../reading/frontier-safety-frameworks';
import { controlStructures } from '../reading/control-structures';
import { externalCommitments } from '../reading/commitments';
import { propositionCollections } from '../reading/human-thought';
import { propositionsView } from './propositions';

/** Chinese institutional histories grouped for navigation only. */
export const chineseHistories = [
  ['deepseek', 'DeepSeek'],
  ['alibaba-group', 'Alibaba / Qwen'],
  ['zhipu', 'Zhipu AI'],
] as const;

/** Institutions with a dossier, as the start page and explorer list them. */
export function landingDossiers(data: Dataset) {
  const names = new Map(data.entities.map((e) => [e.id, e.name]));
  return [
    ...data.meta.anchors.map((id) => ({
      id,
      label: names.get(id)!,
      group: 'Core institutions',
    })),
    ...chineseHistories.map(([id, label]) => ({
      id,
      label,
      group: 'Chinese AI histories',
    })),
  ].filter((d) => institutionalDossier(data, d.id));
}

/**
 * Everything the start page shows, computed from the stored records. It is
 * small enough to ship with the first page, so the start page renders before
 * the full dataset loads.
 */
export function landingSummary(data: Dataset) {
  const status = reviewStatus(data);
  const statementOf = new Map(data.claims.map((c) => [c.id, c.statement]));
  const history = documentHistory(data, frontierSafetyFrameworks);
  const commitments = commitmentsView(data, externalCommitments);
  const years = data.claims
    .map(dateOf)
    .filter((d): d is string => Boolean(d))
    .map((d) => d.slice(0, 4))
    .sort();
  const checks = data.evidence.map((e) => e.checkedAt).sort();
  const reading = researchPaths[0];
  return {
    status,
    /** Statements of the claims the review notice lists by identity. */
    statements: Object.fromEntries(
      [
        ...status.acceptedClaimIds,
        ...status.humanReviewedEvidence.map((e) => e.claimId),
      ].map((id) => [id, statementOf.get(id)!]),
    ),
    history: {
      id: history.collection.id,
      title: history.collection.title,
      frameworks: history.families.length,
      editions: history.families.reduce((n, f) => n + f.editions.length, 0),
      publishers: [...new Set(history.families.map((f) => f.publisher.name))],
    },
    controls: controlStructures.map((c) => ({
      id: c.id,
      title: c.title,
      records: controlStructure(data, c).entries.length,
    })),
    commitments: {
      id: externalCommitments.id,
      title: externalCommitments.title,
      texts: commitments.documents.length,
      organisations: commitments.matrix.length,
    },
    propositions: propositionCollections.map((p) => {
      const view = propositionsView(data, p);
      return {
        id: p.id,
        title: p.title,
        propositions: view.groups.reduce(
          (n, g) => n + g.propositions.length,
          0,
        ),
        records: view.claimIds.length,
        texts: view.documentIds.length,
        landing: p.landing ?? null,
        action: p.landingAction ?? 'Read the propositions →',
      };
    }),
    questions: questionStarters.map((q) => ({
      id: q.id,
      title: q.title,
      question: q.question,
      records: questionStarterView(data, q).claimIds.length,
    })),
    reading: {
      id: reading.id,
      title: reading.title,
      question: reading.question,
    },
    dossiers: landingDossiers(data),
    people: peopleIndex(data),
    coverage: {
      claims: data.claims.length,
      entities: data.entities.length,
      evidence: data.evidence.length,
      sources: data.sources.length,
      firstYear: years[0],
      lastYear: years.at(-1)!,
      firstCheck: checks[0],
      lastCheck: checks.at(-1)!,
    },
  };
}

export type LandingSummary = ReturnType<typeof landingSummary>;
