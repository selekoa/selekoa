/**
 * citation-js with its BibTeX and RIS plugins (MIT). Import this module only
 * dynamically, through `citation.ts`, so none of it is in the main bundle.
 * APA, which needs citeproc-js, is in `citation-apa.ts`.
 */
import { Cite, plugins } from '@citation-js/core';
import '@citation-js/plugin-bibtex';
import '@citation-js/plugin-ris';
import type { CslItem, CslName } from './citation';

// With `asciiOnly`, citation-js drops every character it cannot write as a
// LaTeX command, Chinese titles included. Unicode output keeps them; the
// characters that are special in BibTeX are escaped here instead.
const bibtexConfig = plugins.config.get('@bibtex');
bibtexConfig.format.asciiOnly = false;
bibtexConfig.format.useIdAsLabel = true;
bibtexConfig.format.checkLabel = false;

const latexSpecial: Record<string, string> = {
  '\\': '\\textbackslash{}',
  '~': '\\textasciitilde{}',
  '^': '\\textasciicircum{}',
};
const escapeLatex = (text: string) =>
  text.replace(/[\\~^&%$#_{}]/g, (c) => latexSpecial[c] ?? '\\' + c);

// citation-js writes a literal name in braces, as one unit.
const escapeName = (name: CslName): CslName =>
  'literal' in name
    ? { literal: escapeLatex(name.literal) }
    : {
        family: escapeLatex(name.family),
        given: escapeLatex(name.given),
        ...(name.suffix && { suffix: escapeLatex(name.suffix) }),
      };

function bibtexItem(item: CslItem) {
  const escaped: Record<string, unknown> = { ...item };
  for (const field of [
    'title',
    'publisher',
    'container-title',
    'note',
  ] as const)
    if (typeof item[field] === 'string')
      escaped[field] = escapeLatex(item[field]);
  escaped.author = item.author.map(escapeName);
  return escaped;
}

/**
 * BibLaTeX field names (`date` at its stored precision, `urldate`), which
 * Zotero, JabRef and biber read; classic BibTeX styles ignore `date`.
 */
export const toBibtex = (items: readonly CslItem[]) =>
  new Cite(items.map(bibtexItem)).format('biblatex', {
    format: 'text',
  }) as string;

// RIS dates are YYYY/MM/DD/ with empty parts for unknown precision.
const risDate = (value: string | number) =>
  String(value).replace(
    /^(\d{4})\/(\d{1,2})?\/(\d{1,2})?\//,
    (_, y: string, m = '', d = '') =>
      `${y}/${m.padStart(m ? 2 : 0, '0')}/${d.padStart(d ? 2 : 0, '0')}/`,
  );

/**
 * citation-js maps the fields, but its text output breaks every line after
 * 70 characters, inside words and URLs, and readers join the pieces with a
 * space. The tags are written here on one line each instead. For web pages
 * citation-js writes the access date to M1, a miscellaneous field; it goes
 * to Y2, the access date, as for every other type.
 */
export function toRis(items: readonly CslItem[]) {
  const entries = new Cite([...items]).format('ris', {
    format: 'object',
  }) as Record<string, string | number | (string | number)[]>[];
  return (
    entries
      .map(({ TY, ...tags }, i) => {
        const accessed = items[i].accessed['date-parts'][0].join('/') + '/';
        if (!tags.Y2 && String(tags.M1) === accessed) {
          tags.Y2 = accessed;
          delete tags.M1;
        }
        return [
          `TY  - ${TY}`,
          ...Object.entries(tags).flatMap(([tag, values]) =>
            [values]
              .flat()
              .map(
                (v) =>
                  `${tag}  - ${['DA', 'Y2'].includes(tag) ? risDate(v) : v}`,
              ),
          ),
          'ER  - ',
        ].join('\n');
      })
      .join('\n\n') + '\n'
  );
}

/** Parse BibTeX or RIS back to CSL, for round-trip tests. */
export const parseBibliography = (text: string) =>
  new Cite(text).data as Record<string, unknown>[];
