import type { ChinaScope } from '../domain/landing';

const plural = (n: number, one: string, many: string) =>
  `${n} ${n === 1 ? one : many}`;

/**
 * The China scope note on the Institutions hub and in About's "Not yet
 * covered" (maintainer decision of 2026-10-29). Counts come from the records;
 * `chinaScope` checks the statements about the frameworks-and-law page.
 */
export function chinaScopeNote(scope: ChinaScope): string {
  const tc260 = scope.texts.find(
    (t) => t.family === 'tc260-ai-safety-governance-framework',
  )!;
  return [
    `On China, the records hold ${plural(scope.dossiers, 'institutional dossier', 'institutional dossiers')}, ${plural(scope.texts.length, 'Chinese AI governance text', 'Chinese AI governance texts')} and ${plural(scope.guideTexts, 'Chinese law, standard or government text', 'Chinese laws, standards and government texts')} on the frameworks-and-law page.`,
    `The governance texts are TC260’s AI Safety Governance Framework (${plural(tc260.versions, 'version', 'versions')}), the AI Industry Alliance’s AI Safety Commitments and Shanghai AI Laboratory’s Frontier AI Risk Management Framework, each on its own document page.`,
    `They also hold the Beijing AI Principles (2019) and the Beijing AI Principles for Children (2020), whose releases BAAI took part in, and ${plural(scope.listings, 'list', 'lists')} that the Cyberspace Administration of China published of filed generative AI services and deep-synthesis algorithms, each recorded as a dated listing with its count. A listing is not an approval.`,
    'Shanghai AI Laboratory’s framework, which recommends practices to general-purpose AI developers, is the only framework from a Chinese developer in the records. Other Chinese developers’ statements about their own safety work are recorded from their reports, announcements and prospectus, on their dossiers.',
    'Not covered: TC260’s framework is not on the frameworks-and-law page, the scope of the national standard GB 45438-2025 is held because its text was not retrieved, and export controls are covered only through the US Bureau of Industry and Security’s records.',
  ].join(' ');
}
