/**
 * APA 7 references through citation-js (MIT) and its CSL plugin, which runs
 * citeproc-js (CPAL-1.0 or AGPL-1.0) with the APA style bundled in the
 * plugin. A chunk of its own, loaded only when a reader copies an APA
 * reference; import it only dynamically, through `citation.ts`.
 */
import { Cite } from '@citation-js/core';
import '@citation-js/plugin-csl';
import type { CslItem } from './citation';

export function toApa(items: readonly CslItem[]) {
  const cite = new Cite([...items]);
  const options = { template: 'apa', lang: 'en-US' };
  return {
    text: (
      cite.format('bibliography', { ...options, format: 'text' }) as string
    ).trim(),
    html: (
      cite.format('bibliography', { ...options, format: 'html' }) as string
    ).trim(),
  };
}
