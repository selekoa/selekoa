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
import { propositionFrames } from '../reading/proposition-frames';
import { propositionsView } from './propositions';
import { frameworksLawView } from './frameworks-law';
import { computeGuides, editionGuides, guides } from '../reading/guides';
import { frameworkComparison } from '../reading/framework-comparison';
import { comparisonFacets } from './framework-comparison';
import { frontierFrameworksAndLaw } from '../reading/frameworks-and-law';
import { frameworkVersions } from './versions';

/** Chinese institutional histories grouped for navigation only. */
export const chineseHistories = [
  ['deepseek', 'DeepSeek'],
  ['alibaba-group', 'Alibaba / Qwen'],
  ['zhipu', 'Zhipu AI'],
  ['moonshot-ai', 'Moonshot AI'],
  ['minimax', 'MiniMax'],
  ['baidu', 'Baidu / ERNIE'],
  ['bytedance-seed', 'ByteDance Seed'],
  // Third collection (2026-10-31).
  ['stepfun', 'StepFun'],
  ['zero-one-ai', '01.AI'],
  ['iflytek', 'iFlytek'],
  ['sensetime', 'SenseTime'],
  ['tencent', 'Tencent / Hunyuan'],
  ['baai', 'BAAI'],
  ['shanghai-ai-lab', 'Shanghai AI Laboratory'],
] as const;

/**
 * The Chinese AI governance texts, by document family (navigation only): the
 * second Chinese collection's TC260 framework, AI Industry Alliance
 * commitments and Shanghai AI Laboratory framework.
 */
export const chineseGovernanceFamilies = [
  'tc260-ai-safety-governance-framework',
  'aiia-ai-safety-commitments',
  'sail-frontier-ai-risk-management-framework',
] as const;

/**
 * What the records cover on China, counted from the stored records, for the
 * scope note on the Institutions hub and the About page (maintainer decision
 * of 2026-10-29). Each statement the note makes about the records is
 * checked here, so the note fails the build rather than going stale.
 */
export function chinaScope(data: Dataset) {
  const guide = frontierFrameworksAndLaw;
  const onGuide = new Set(
    guide.sections.flatMap((s) => s.instruments.map((i) => i.documentId)),
  );
  const texts = chineseGovernanceFamilies.map((family) => {
    const versions = frameworkVersions(data, family);
    if (!versions.length) throw new Error('No Chinese text: ' + family);
    // None of the governance texts is on the frameworks-and-law page.
    if (versions.some((v) => onGuide.has(v.id)))
      throw new Error('Chinese text now on the guide: ' + family);
    return { family, versions: versions.length };
  });
  // The third collection's texts that are not framework editions: the
  // Beijing principles and the CAC's dated lists (2026-10-31).
  for (const id of [
    'beijing-ai-principles-2019',
    'beijing-ai-principles-for-children-2020',
  ])
    if (!data.entities.some((e) => e.id === id))
      throw new Error('No Chinese principles text: ' + id);
  const listings = data.entities.filter((e) =>
    /^cn-cac-(genai-service|deep-synthesis)-list-/.test(e.id),
  ).length;
  if (!listings) throw new Error('No CAC listing');
  const china = guide.sections.find((s) => s.id === 'china');
  if (!china) throw new Error('No China section on the guide');
  if (!guide.notCovered.some((n) => n.id === 'gb-45438-scope'))
    throw new Error('GB 45438-2025 scope no longer held');
  return {
    dossiers: landingDossiers(data).filter(
      (d) => d.group === 'Chinese AI histories',
    ).length,
    texts,
    listings,
    guideTexts: china.instruments.length,
  };
}
export type ChinaScope = ReturnType<typeof chinaScope>;

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
    guides: guides.map((g) => {
      const view = frameworksLawView(data, g);
      return {
        id: g.id,
        title: g.title,
        editions: view.editions.length,
        texts: view.sections.reduce((n, s) => n + s.instruments.length, 0),
        jurisdictions: view.sections.length,
        links: view.links.length,
      };
    }),
    editionGuides: editionGuides.map((g) => ({
      id: g.id,
      title: g.title,
      editions: frameworkComparison.families.reduce(
        (n, f) => n + frameworkVersions(data, f).length,
        0,
      ),
      frameworks: frameworkComparison.families.length,
      questions: comparisonFacets.length,
    })),
    computeGuides: computeGuides.map((g) => ({
      id: g.id,
      title: g.title,
      records: g.sections.reduce(
        (n, s) => n + s.groups.reduce((m, gr) => m + gr.claimIds.length, 0),
        0,
      ),
    })),
    propositions: propositionFrames.map((p) => {
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
    china: chinaScope(data),
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
