/**
 * The reading pages search lists above the records, with the text search
 * reads on each (its question and introduction): computed by the build for
 * the search facets (src/ui/search-facets.ts), from whole collections.
 */
import type { Dataset } from '../domain/schema';
import type { PageEntry } from '../domain/search';
import { referencePath } from '../domain/deep-links';
import { hubIds, type ReferenceTarget } from '../domain/addresses';
import { researchPaths } from '../domain/research-path';
import { landingSummary } from '../domain/landing';
import { documentHistories } from '../reading/frontier-safety-frameworks';
import { frameworkComparison } from '../reading/framework-comparison';
import { modelCards } from '../reading/model-cards';
import { controlStructures } from '../reading/control-structures';
import { controlTimelines } from '../reading/control-timelines';
import { commitmentCollections } from '../reading/commitments';
import { computeGuides, editionGuides, guides } from '../reading/guides';
import { questionStarters } from '../reading/self-governance';
import { propositionCollections } from '../reading/human-thought';
import { stancesQuestion } from '../reading/proposition-stances-page';
import { predictionsOnRecord } from '../reading/predictions';
import { hubOutline, hubSubtitles } from '../ui/Hub';
import { chronicleIndexOf } from '../domain/chronicle-index';
import { chronicleText } from '../reading/chronicle';
import { pageMeta, siteName } from './pages';

const passageText = (text: string | { text: string }[]) =>
  typeof text === 'string' ? text : text.map((p) => p.text).join(' ');

/**
 * The reading pages search lists above the records: hubs, About & method,
 * the record explorer, collections, guided readings, question starters and
 * control structures. Titles are the pages' own (`pageMeta`).
 */
export function searchablePages(data: Dataset): PageEntry[] {
  const entry = (
    target: ReferenceTarget,
    kind: string,
    question?: string,
    summary?: string,
  ): PageEntry => {
    const path = referencePath(target);
    const title = pageMeta(data, path)!.title.replace(` · ${siteName}`, '');
    return { path, kind, title, question, summary };
  };
  const summary = landingSummary(data);
  return [
    ...hubIds.map((id) =>
      entry(
        { kind: 'hub', id },
        'Hub',
        hubSubtitles[id],
        hubOutline(summary, id).description,
      ),
    ),
    entry(
      { kind: 'about' },
      'About & method',
      undefined,
      pageMeta(data, '/about')!.description,
    ),
    entry(
      { kind: 'explore' },
      'Record explorer',
      undefined,
      pageMeta(data, '/explore')!.description,
    ),
    ...guides.map((c) =>
      entry(
        { kind: 'guide', id: c.id },
        'Guided reading',
        c.question,
        [c.coverage, ...c.orientation.map((o) => o.text)].join(' '),
      ),
    ),
    ...editionGuides.map((c) =>
      entry(
        { kind: 'guide', id: c.id },
        'Guided reading',
        c.question,
        c.reading.join(' '),
      ),
    ),
    ...computeGuides.map((c) =>
      entry(
        { kind: 'guide', id: c.id },
        'Guided reading',
        c.question,
        [c.bounds, ...c.orientation.map((o) => o.text)].join(' '),
      ),
    ),
    ...questionStarters.map((c) =>
      entry(
        { kind: 'question', id: c.id },
        'Research question',
        c.question,
        c.scope,
      ),
    ),
    ...researchPaths.map((c) =>
      entry(
        { kind: 'question', id: c.id },
        'Guided reading',
        c.question,
        passageText(c.introduction),
      ),
    ),
    ...controlStructures.map((c) =>
      entry(
        { kind: 'control', id: c.id },
        'Control structure',
        c.question,
        c.introduction,
      ),
    ),
    entry(
      { kind: 'control', id: controlTimelines.id },
      'Control structure',
      controlTimelines.question,
      controlTimelines.introduction,
    ),
    ...documentHistories.map((c) =>
      entry(
        { kind: 'documents', id: c.id },
        'Document history',
        c.question,
        c.introduction,
      ),
    ),
    entry(
      { kind: 'compare', id: frameworkComparison.id },
      'Comparison',
      frameworkComparison.question,
      frameworkComparison.introduction + ' ' + frameworkComparison.reading,
    ),
    entry(
      { kind: 'compare', id: modelCards.id },
      'Comparison',
      modelCards.question,
      modelCards.introduction,
    ),
    ...commitmentCollections.map((c) =>
      entry(
        { kind: 'commitments', id: c.id },
        'Commitments',
        c.question,
        c.introduction,
      ),
    ),
    ...propositionCollections.map((c) =>
      entry(
        { kind: 'propositions', id: c.id },
        'Propositions',
        c.question,
        c.introduction,
      ),
    ),
    entry(
      { kind: 'predictions', id: predictionsOnRecord.id },
      'Predictions',
      predictionsOnRecord.question,
      predictionsOnRecord.introduction,
    ),
    entry({ kind: 'stances' }, 'Propositions', stancesQuestion),
    entry(
      { kind: 'years' },
      'Chronicle',
      undefined,
      chronicleText.indexDescription,
    ),
    // Each year by its title alone; the index's entry describes them.
    ...chronicleIndexOf(data).years.map((y) =>
      entry({ kind: 'year', id: String(y.year) }, 'Chronicle'),
    ),
  ];
}
