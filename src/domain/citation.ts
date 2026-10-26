import type { Dataset, Entity, Source } from './schema';

/**
 * Citation export: source records as CSL-JSON, and from that BibTeX, RIS and
 * APA through citation-js, which is loaded only when a reader asks for a
 * format. A citation names the original document, never Selekoa, and carries
 * no claim, paraphrase or quote.
 *
 * Mapping rules (precision over polish):
 *
 * - Type. A Selekoa kind maps to a specific CSL type only where the kind
 *   guarantees it; mixed kinds map to the generic `document`.
 *
 *   | Selekoa kind   | CSL type  | Why                                                     |
 *   | -------------- | --------- | ------------------------------------------------------- |
 *   | `announcement` | `webpage` | An organisation's published announcement                |
 *   | `article`      | `document`| News, magazine, blog and essay texts; no venue type kept |
 *   | `report`       | `report`  | Reports, system cards and similar documents             |
 *   | `paper`        | `document`| Preprints, journal papers and proceedings alike         |
 *   | `message`      | `post`    | Mailing-list and newsgroup messages                     |
 *   | `filing`       | `document`| Bills, court and tax filings, certificates              |
 *   | `post`         | `post`    | Forum and blog posts                                    |
 *   | `book`         | `book`    |                                                         |
 *   | `dataset`      | `dataset` |                                                         |
 *
 *   For `message` and `post` the publisher (the list, group or forum) is
 *   also the CSL `container-title`.
 * - Authors. A source's `authorNames` (schema 2.14), where recorded, give
 *   the names as stored: `family`, `given` and `suffix` for a person, a
 *   `literal` for an organisation, a group or a pseudonym. Otherwise an
 *   author string is a personal name (`family`, `given`) only when it is the
 *   name or an alias of a person record and of no other record; the
 *   person's `sortName` ("Family, Given") supplies the parts. Every other
 *   string, organisations included, is a CSL `literal` and is never split.
 * - Dates. `issued` is the publication date at its stored precision (year,
 *   year-month or day). An unknown publication date gives no `issued`
 *   (rendered "n.d."); no day or month is ever added. `accessed` is the
 *   access date.
 * - Versions. Editions of a versioned document (sources whose document
 *   record has `documentVersion`) are kept apart by title. Published titles
 *   name their edition in the document's own words ("Version 2", "May 2026
 *   edition"). Where two editions of one family share a title, the edition
 *   label is added to it, so they never collapse into one reference. The CSL
 *   `version` field is not used: APA prints it after the title, repeating
 *   the edition in Selekoa's label form ("Version 2 (Version v2.0)"). The
 *   source's free-text `version` describes Selekoa's inspection and is not
 *   printed.
 * - Addresses. `URL` is the canonical address. The note gives the version
 *   date, the inspected copy where it differs from the canonical address,
 *   and the archive copy with its capture date.
 */

export type CslName =
  { family: string; given: string; suffix?: string } | { literal: string };
export type CslDate = { 'date-parts': [number[]] };
export type CslItem = {
  id: string;
  type: CslType;
  title: string;
  author: CslName[];
  publisher: string;
  'container-title'?: string;
  issued?: CslDate;
  accessed: CslDate;
  URL: string;
  language?: string;
  note?: string;
};
export type CslType =
  'webpage' | 'document' | 'report' | 'post' | 'book' | 'dataset';

export const cslTypes: Record<Source['kind'], CslType> = {
  announcement: 'webpage',
  article: 'document',
  report: 'report',
  paper: 'document',
  message: 'post',
  filing: 'document',
  post: 'post',
  book: 'book',
  dataset: 'dataset',
};
const venueKinds = new Set<Source['kind']>(['message', 'post']);

export type CitationLookup = {
  persons: Map<string, { family: string; given: string }>;
  editions: Map<string, { family: string; label: string }>;
  collidingTitles: Set<string>;
};

/** The person names and document editions the mapping needs from the records. */
export function citationLookup(
  data: Pick<Dataset, 'entities' | 'sources'>,
): CitationLookup {
  const types = new Map<string, Set<Entity['type']>>();
  const persons = new Map<string, { family: string; given: string }>();
  for (const e of data.entities)
    for (const name of new Set([e.name, e.shortName, ...e.aliases])) {
      if (!name) continue;
      if (!types.has(name)) types.set(name, new Set());
      types.get(name)!.add(e.type);
      const parts = e.type === 'person' && e.sortName?.split(', ');
      if (parts && parts.length === 2 && !persons.has(name))
        persons.set(name, { family: parts[0], given: parts[1] });
    }
  for (const name of [...persons.keys()])
    if (types.get(name)!.size > 1) persons.delete(name);

  const documents = new Map(data.entities.map((e) => [e.id, e]));
  const editions = new Map<string, { family: string; label: string }>();
  const titles = new Map<string, number>();
  for (const s of data.sources) {
    const version = s.documentId
      ? documents.get(s.documentId)?.documentVersion
      : undefined;
    if (!version) continue;
    editions.set(s.id, { family: version.family, label: version.label });
    const key = version.family + '\u0000' + s.title;
    titles.set(key, (titles.get(key) ?? 0) + 1);
  }
  const collidingTitles = new Set(
    [...titles].filter(([, n]) => n > 1).map(([key]) => key),
  );
  return { persons, editions, collidingTitles };
}

const dateParts = (date: string): CslDate => ({
  'date-parts': [date.split('-').map(Number)],
});

export function cslName(author: string, lookup: CitationLookup): CslName {
  const person = lookup.persons.get(author);
  return person ? { ...person } : { literal: author };
}

/** One source as a CSL-JSON item. */
export function cslItem(source: Source, lookup: CitationLookup): CslItem {
  const edition = lookup.editions.get(source.id);
  const collides =
    edition &&
    lookup.collidingTitles.has(edition.family + '\u0000' + source.title);
  // Angle brackets delimit addresses in text (RFC 3986, appendix C), so no
  // punctuation is read as part of a URL.
  const note = [
    source.versionDate && `Version date: ${source.versionDate}`,
    source.evidenceUrl !== source.canonicalUrl &&
      source.evidenceUrl !== source.archivedUrl &&
      `Inspected copy: <${source.evidenceUrl}>`,
    source.archivedUrl &&
      `Archived copy: <${source.archivedUrl}>` +
        (source.archivedAt ? `, captured ${source.archivedAt}` : ''),
  ].filter(Boolean);
  const item: CslItem = {
    id: source.id,
    type: cslTypes[source.kind],
    title: collides ? `${source.title} (${edition.label})` : source.title,
    author: source.authorNames
      ? source.authorNames.map((name) => ({ ...name }))
      : source.authors.map((a) => cslName(a, lookup)),
    publisher: source.publisher,
    accessed: dateParts(source.accessedAt),
    URL: source.canonicalUrl,
  };
  if (venueKinds.has(source.kind)) item['container-title'] = source.publisher;
  if (source.publicationDate) item.issued = dateParts(source.publicationDate);
  if (source.language) item.language = source.language;
  if (note.length) item.note = note.join('. ') + '.';
  return item;
}

/** CSL-JSON items for sources, in the order given. */
export function cslItems(
  data: Pick<Dataset, 'entities' | 'sources'>,
  sources: readonly Source[],
  lookup = citationLookup(data),
) {
  return sources.map((s) => cslItem(s, lookup));
}

export const cslJson = (items: readonly CslItem[]) =>
  JSON.stringify(items, null, 2) + '\n';

export type CitationFormat = 'bibtex' | 'ris' | 'csl-json';

export const citationFiles: Record<
  CitationFormat,
  { label: string; extension: string; type: string }
> = {
  bibtex: {
    label: 'BibTeX',
    extension: 'bib',
    type: 'application/x-bibtex;charset=utf-8',
  },
  ris: {
    label: 'RIS',
    extension: 'ris',
    type: 'application/x-research-info-systems;charset=utf-8',
  },
  'csl-json': {
    label: 'CSL-JSON',
    extension: 'csl.json',
    type: 'application/vnd.citationstyles.csl+json;charset=utf-8',
  },
};

/** A bibliography file. BibTeX and RIS load the citation library on demand. */
export async function bibliographyFile(
  items: readonly CslItem[],
  format: CitationFormat,
) {
  if (format === 'csl-json') return cslJson(items);
  const engine = await import('./citation-engine');
  return format === 'bibtex' ? engine.toBibtex(items) : engine.toRis(items);
}

/** APA 7 references as plain text and HTML, through citation-js and citeproc-js. */
export async function apaReference(items: readonly CslItem[]) {
  const { toApa } = await import('./citation-apa');
  return toApa(items);
}
