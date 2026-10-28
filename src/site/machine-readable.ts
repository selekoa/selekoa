// The machine-readable entry points beside the application: the latest
// dataset release under data/ and llms.txt. Pure: the build plugin
// (scripts/site-config.ts) reads the files and passes them in.
import { hasContact, type SiteConfig } from './site-config.ts';

/** The parts of a release manifest that the published files depend on. */
export type ReleaseManifest = {
  version: string;
  releasedAt: string;
  files: { path: string; bytes: number }[];
};

/** Licence files published beside the release files, as in the dataset archive. */
export const dataLicenceFiles = ['LICENSE-DATA.txt', 'LICENSING.md'];

/** Published paths under data/: the manifest, its files and the licence files, sorted. */
export const dataPaths = (manifest: ReleaseManifest) =>
  ['manifest.json', ...manifest.files.map((f) => f.path), ...dataLicenceFiles]
    .sort()
    .map((name) => `data/${name}`);

/**
 * The type a file under data/ or llms.txt is served with. Every published
 * text file is UTF-8; without the charset a browser may read Markdown or CSV
 * as Latin-1, and a host may offer CITATION.cff as a binary download.
 */
export function contentType(path: string) {
  if (path.endsWith('.json')) return 'application/json; charset=utf-8';
  if (path.endsWith('.csv')) return 'text/csv; charset=utf-8';
  return 'text/plain; charset=utf-8';
}

/** What each release file holds, for llms.txt (docs/dataset-format.md, "Files"). */
const fileNotes: Record<string, string> = {
  'README.md':
    'what the release contains, how to cite a record and what to check before relying on one',
  'manifest.json':
    'version, release date, counts, schema version, each file’s SHA-256 checksum and each field’s text class',
  'claims.json':
    'one scoped statement each, with dates, status and evidence IDs',
  'entities.json':
    'people, organisations, documents, concepts, models, public bodies and other referents',
  'evidence.json':
    'one source passage used for one claim, with its locator, quote or paraphrase, source role and check date',
  'sources.json': 'the inspected bibliographic expression of each source',
  'collections.json':
    'authored reading collections and the claims each one uses',
  'sources.csl.json':
    'every source as a CSL-JSON item, to cite the original documents',
  'changes.json':
    'records added, changed and removed since the previous release, by ID',
  'CHANGELOG.md': 'the same changes in prose',
  'CITATION.cff': 'citation metadata for the release as a whole',
};

const primary = [
  'README.md',
  'manifest.json',
  'claims.json',
  'entities.json',
  'evidence.json',
  'sources.json',
  'collections.json',
  'sources.csl.json',
];

/**
 * llms.txt (https://llmstxt.org/): what Selekoa is, the limits of its
 * records and links to the files a program can read. Addresses are absolute
 * once the site has a public base address, relative before.
 */
export function llmsTxt(c: SiteConfig, manifest: ReleaseManifest) {
  const url = (path: string) => c.baseUrl + path;
  const names = dataPaths(manifest).map((p) => p.slice('data/'.length));
  const link = (name: string) => {
    const note = fileNotes[name];
    return `- [${name}](${url('data/' + name)})${note ? ': ' + note : ''}`;
  };
  const csv = names.filter((n) => n.endsWith('.csv'));
  const rest = ['changes.json', 'CHANGELOG.md', 'CITATION.cff'].filter((n) =>
    names.includes(n),
  );
  const archive = `release/selekoa-dataset-v${manifest.version}.zip`;
  const contact = hasContact(c) ? c.contact : null;
  return [
    '# Selekoa',
    '',
    '> A documentary history of machine intelligence.',
    '',
    'Selekoa is a machine-first starting point for research on the history of machine intelligence: machines find and check the records, and every one links to its source, for you to verify and build on. It records people, institutions, documents, funding and governance as individual claims. A claim is one scoped statement linked to the source passages it rests on, with its date, qualification and review state.',
    '',
    'Every page is built as plain HTML, so a program that does not run JavaScript reads the same text a reader sees. The records behind every page are also published as the files below.',
    '',
    '## Pages',
    '',
    `Each address is the record ID or collection ID after a fixed prefix.${c.indexing ? ` The [sitemap](${url('sitemap.xml')}) lists every page.` : ''}`,
    '',
    `- Claims: \`${url('claim/<claim-id>')}\`, with the statement, qualification, dates, review state and the evidence passages with their sources`,
    `- People: \`${url('person/<person-id>')}\`; documents: \`${url('document/<document-id>')}\`; organisations: \`${url('dossier/<organisation-id>')}\``,
    `- Collections: \`${url('documents/<id>')}\` (document histories), \`${url('compare/<id>')}\` (the framework comparison), \`${url('control/<id>')}\` (control structures), \`${url('commitments/<id>')}\`, \`${url('propositions/<id>')}\` and \`${url('question/<id>')}\` (questions and guided readings)`,
    `- [Governance](${url('governance')}), [Ideas & debates](${url('ideas')}), [Institutions & people](${url('institutions')}), [Search](${url('search')}) (the search itself runs in the browser)`,
    '',
    '## Before relying on a record',
    '',
    '- A claim records what its sources state. It is not a finding of fact. Read the cited passage in the original source, in the edition the evidence names.',
    '- The records are machine-checked: an automated research process checked each passage. Most claims have not been reviewed by an editor (`editorialState: seed`); the README lists what the labels mean.',
    '- Coverage is selective and uneven. A missing record is a gap in coverage, not evidence that something did not happen.',
    '- A published framework, commitment or law shows what its author said, not that anyone implemented or complied with it.',
    `- Selekoa’s own records and text are licensed under CC BY 4.0. Quoted source passages (the \`quote\` field of evidence records), quotations inside Selekoa text and the source documents are excluded and remain subject to their owners’ rights. The [scope note](${url('data/LICENSING.md')}) and the [legal code](${url('data/LICENSE-DATA.txt')}) are published beside the data.`,
    '',
    `## Data: dataset release v${manifest.version} (${manifest.releasedAt})`,
    '',
    'These are the files of the latest release, unchanged. The JSON files are authoritative. These addresses always serve the latest release; `manifest.json` names its version.',
    '',
    ...primary.filter((n) => names.includes(n)).map(link),
    `- [Dataset archive (ZIP)](${url(archive)}): every file of this release with the licence files. Each release has its own archive at a fixed address of the form \`release/selekoa-dataset-vX.Y.Z.zip\`.`,
    '',
    '## How to cite and contact',
    '',
    `- [How to cite](${url('data/README.md')}): cite the original source for a fact, and Selekoa for a record, by its record ID and release version: “Selekoa, claim record \`<claim-id>\`, dataset release v${manifest.version} (${manifest.releasedAt}).”`,
    `- [About & method](${url('about')}): method, labels, known limits, citation and corrections`,
    ...(contact
      ? [
          `- Corrections and requests: ${contact}. Give the record ID, what is wrong and the source that shows it.`,
        ]
      : []),
    '',
    '## Optional',
    '',
    ...rest.map(link),
    ...csv.map(
      (n) =>
        `- [${n}](${url('data/' + n)}): flat view of \`${n.replace(/\.csv$/, '.json')}\``,
    ),
    '',
  ].join('\n');
}
