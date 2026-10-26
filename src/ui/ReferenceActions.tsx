import { Fragment, useId, useState } from 'react';
import { referenceHash, type ReferenceTarget } from '../domain/deep-links';
import {
  packetJson,
  packetMarkdown,
  researchPacket,
} from '../domain/references';
import type { Dataset, Source } from '../domain/schema';
import {
  apaReference,
  bibliographyFile,
  citationFiles,
  cslItems,
  type CitationFormat,
} from '../domain/citation';
import type { PathSelection } from '../domain/research-path';
import {
  documentHistoryStarter,
  personProjectionVersion,
  personStarter,
  personStarterMarkdown,
  starterJson,
  starterMarkdown,
} from '../domain/starter';
import type { DocumentHistoryCollection } from '../domain/document-history';
import type { ControlStructureCollection } from '../domain/control-structures';
import type { CommitmentsCollection } from '../domain/commitments';
import {
  commitmentsStarter,
  commitmentsStarterMarkdown,
  controlStarterMarkdown,
  controlStructureStarter,
} from '../domain/governance-starters';
import type { QuestionStarterDefinition } from '../domain/question-starter';
import type { PropositionsCollection } from '../domain/propositions';
import {
  propositionsStarter,
  propositionsStarterMarkdown,
} from '../domain/propositions-starter';
import {
  questionStarter,
  questionStarterMarkdown,
} from '../domain/question-starter-export';

export function referenceUrl(target: ReferenceTarget) {
  const url = new URL(window.location.href);
  url.hash = referenceHash(target);
  return url.href;
}

type CopyValue = string | { text: string; html: string };

/** Writes HTML as well as plain text where the browser allows, so italics survive pasting. */
async function writeClipboard(value: CopyValue) {
  if (typeof value === 'string' || typeof ClipboardItem === 'undefined')
    return navigator.clipboard.writeText(
      typeof value === 'string' ? value : value.text,
    );
  await navigator.clipboard.write([
    new ClipboardItem({
      'text/plain': new Blob([value.text], { type: 'text/plain' }),
      'text/html': new Blob([value.html], { type: 'text/html' }),
    }),
  ]);
}

export function CopyReference({
  label,
  text,
}: {
  label: string;
  text: () => CopyValue | Promise<CopyValue>;
}) {
  const [status, setStatus] = useState('');
  const [fallback, setFallback] = useState('');
  return (
    <div className="reference-action">
      <button
        className="text-button"
        onClick={async () => {
          setFallback('');
          try {
            const value = await text();
            try {
              await writeClipboard(value);
              setStatus('Copied.');
            } catch {
              setFallback(typeof value === 'string' ? value : value.text);
              setStatus(
                'Clipboard unavailable. Select and copy the reference below.',
              );
            }
          } catch {
            setStatus('Reference could not be generated. Please try again.');
          }
        }}
      >
        {label}
      </button>
      <span role="status">{status}</span>
      {fallback && (
        <textarea
          aria-label={label + ' text'}
          readOnly
          value={fallback}
          onFocus={(e) => e.currentTarget.select()}
        />
      )}
    </div>
  );
}

export function CopyLink({
  target,
  label = 'Copy link',
}: {
  target: ReferenceTarget;
  label?: string;
}) {
  return <CopyReference label={label} text={() => referenceUrl(target)} />;
}

function downloadFile(text: string, filename: string, type: string) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadText(text: string, format: 'md' | 'json', name: string) {
  downloadFile(
    text,
    `${name}.${format}`,
    format === 'md'
      ? 'text/markdown;charset=utf-8'
      : 'application/json;charset=utf-8',
  );
}

const citationFormats: CitationFormat[] = ['bibtex', 'ris', 'csl-json'];

async function downloadBibliography(
  data: Dataset,
  sources: readonly Source[],
  format: CitationFormat,
  name: string,
) {
  const file = citationFiles[format];
  const text = await bibliographyFile(cslItems(data, sources), format);
  downloadFile(text, `${name}.${file.extension}`, file.type);
}

/** APA and reference-manager files for one source, from its source record. */
export function CiteSource({
  data,
  source,
}: {
  data: Dataset;
  source: Source;
}) {
  const [status, setStatus] = useState('');
  const download = async (format: CitationFormat) => {
    try {
      await downloadBibliography(data, [source], format, source.id);
      setStatus(`${citationFiles[format].label} file ready.`);
    } catch {
      setStatus('The file could not be generated. Please try again.');
    }
  };
  return (
    <details className="cite-source">
      <summary>Cite the original source</summary>
      <p>
        Cite the original document, not Selekoa. Check these details against it.
      </p>
      <CopyReference
        label="Copy APA"
        text={async () => {
          const apa = await apaReference(cslItems(data, [source]));
          return apa;
        }}
      />
      <div className="cite-downloads">
        {citationFormats.map((format) => (
          <button
            key={format}
            className="text-button"
            onClick={() => void download(format)}
          >
            Download {citationFiles[format].label}
          </button>
        ))}
      </div>
      <p role="status">{status}</p>
    </details>
  );
}

/** One bibliography file of every source an export cites, in each format. */
function BibliographyDownload({
  data,
  name,
  sources,
}: {
  data: Dataset;
  name: string;
  sources: () => Promise<readonly Source[]>;
}) {
  const [status, setStatus] = useState('');
  const id = useId();
  const download = async (format: CitationFormat) => {
    try {
      const list = await sources();
      await downloadBibliography(data, list, format, `${name}-sources`);
      setStatus(
        `${citationFiles[format].label} file ready: ${list.length} source${list.length === 1 ? '' : 's'}.`,
      );
    } catch {
      setStatus('The file could not be generated. No file was downloaded.');
    }
  };
  return (
    <div className="bibliography-export" role="group" aria-labelledby={id}>
      <p id={id}>
        <strong>Original sources for a reference manager.</strong> Every source
        this export cites, for Zotero, EndNote and similar tools. Cite the
        original documents, not Selekoa, and check each entry against them.
      </p>
      {citationFormats.map((format) => (
        <Fragment key={format}>
          <button onClick={() => void download(format)}>
            Download {citationFiles[format].label}
          </button>{' '}
        </Fragment>
      ))}
      <p role="status">{status}</p>
    </div>
  );
}

export function ExportReading({
  data,
  selection,
}: {
  data: Dataset;
  selection: PathSelection;
}) {
  const [status, setStatus] = useState('');
  const download = async (format: 'md' | 'json') => {
    try {
      const packet = await researchPacket(data, selection);
      downloadText(
        format === 'md' ? packetMarkdown(packet) : packetJson(packet),
        format,
        `${selection.id}-v${selection.version}`,
      );
      setStatus(
        'Export ready. Source passages are omitted, and review statuses are kept.',
      );
    } catch {
      setStatus('Export failed. No partial packet was downloaded.');
    }
  };
  return (
    <details className="path-details research-export">
      <summary>Export this reading</summary>
      <p>
        The whole reading in its set order, including the optional branches and
        the claims behind each paragraph. The machine-written text and the
        stored claims are kept separate. Source passages are not included.
      </p>
      <button onClick={() => void download('md')}>Download Markdown</button>{' '}
      <button onClick={() => void download('json')}>Download JSON</button>
      <p role="status">{status}</p>
      <BibliographyDownload
        data={data}
        name={`${selection.id}-v${selection.version}`}
        sources={async () => (await researchPacket(data, selection)).sources}
      />
    </details>
  );
}

/** Builds both formats before any download, so a failure leaves no partial file. */
function StarterDownload({
  data,
  name,
  description,
  build,
}: {
  data: Dataset;
  name: string;
  description: string;
  build: () => Promise<{
    md: string;
    json: string;
    sources: readonly Source[];
  }>;
}) {
  const [status, setStatus] = useState('');
  const download = async (format: 'md' | 'json') => {
    try {
      const files = await build();
      downloadText(files[format], format, name);
      setStatus(
        'Starter ready. Review statuses are kept, and passages appear only where each source’s reuse note allows.',
      );
    } catch {
      setStatus('Export failed. No partial starter was downloaded.');
    }
  };
  return (
    <details className="path-details research-export">
      <summary>Download research starter</summary>
      <p>{description}</p>
      <button onClick={() => void download('md')}>
        Download Markdown
      </button>{' '}
      <button onClick={() => void download('json')}>Download JSON</button>
      <p role="status">{status}</p>
      <BibliographyDownload
        data={data}
        name={name}
        sources={async () => (await build()).sources}
      />
    </details>
  );
}

export function ExportStarter({
  data,
  collection,
}: {
  data: Dataset;
  collection: DocumentHistoryCollection;
}) {
  return (
    <StarterDownload
      data={data}
      name={`${collection.id}-v${collection.version}-starter`}
      description="Every edition, claim, qualification, coverage gap, open question and source reference on this page, with the location of each piece of evidence, stored paraphrases and permitted short quotes. The machine selection and each record’s review status are kept separate. Original documents are not included."
      build={async () => {
        const starter = await documentHistoryStarter(data, collection);
        return {
          md: starterMarkdown(starter),
          json: starterJson(starter),
          sources: starter.sources,
        };
      }}
    />
  );
}

export function ExportPersonStarter({
  data,
  personId,
}: {
  data: Dataset;
  personId: string;
}) {
  return (
    <StarterDownload
      data={data}
      name={`${personId}-person-v${personProjectionVersion}-starter`}
      description="The documented path, undated records, works, credits, governance records and every other claim on this page, with evidence locations, qualifications, the computed limits, stored paraphrases and permitted short quotes. Original documents are not included."
      build={async () => {
        const starter = await personStarter(data, personId);
        return {
          md: personStarterMarkdown(starter),
          json: starterJson(starter),
          sources: starter.sources,
        };
      }}
    />
  );
}

export function ExportControlStarter({
  data,
  collection,
}: {
  data: Dataset;
  collection: ControlStructureCollection;
}) {
  return (
    <StarterDownload
      data={data}
      name={`control-${collection.id}-v${collection.version}-starter`}
      description="The recorded control rights and every timeline record on this page, with instruments, stages, evidence locations, qualifications, disputed assessments, open questions, questions set aside, source references, stored paraphrases and permitted short quotes. Original documents are not included."
      build={async () => {
        const starter = await controlStructureStarter(data, collection);
        return {
          md: controlStarterMarkdown(starter),
          json: starterJson(starter),
          sources: starter.sources,
        };
      }}
    />
  );
}

export function ExportCommitmentsStarter({
  data,
  collection,
}: {
  data: Dataset;
  collection: CommitmentsCollection;
}) {
  return (
    <StarterDownload
      data={data}
      name={`${collection.id}-v${collection.version}-starter`}
      description="Every commitment text, signatory and refusal record, quoted provision and explicit framework link on this page, with evidence locations, qualifications, open questions, questions set aside, source references, stored paraphrases and permitted short quotes. Original documents are not included."
      build={async () => {
        const starter = await commitmentsStarter(data, collection);
        return {
          md: commitmentsStarterMarkdown(starter),
          json: starterJson(starter),
          sources: starter.sources,
        };
      }}
    />
  );
}

export function ExportPropositionsStarter({
  data,
  collection,
}: {
  data: Dataset;
  collection: PropositionsCollection;
}) {
  return (
    <StarterDownload
      data={data}
      name={`propositions-${collection.id}-v${collection.version}-starter`}
      description="The original sources first, in date order, then every proposition on this page with its criterion, earliest located text and records. Each record gives its original source and the place in it, its role, register and dates, the qualification and the missing element of a context record, then the Selekoa identifiers. Stored paraphrases and permitted short quotes are included. Original documents are not."
      build={async () => {
        const starter = await propositionsStarter(data, collection);
        return {
          md: propositionsStarterMarkdown(starter),
          json: starterJson(starter),
          sources: starter.sources,
        };
      }}
    />
  );
}

export function ExportQuestionStarter({
  data,
  definition,
}: {
  data: Dataset;
  definition: QuestionStarterDefinition;
}) {
  return (
    <StarterDownload
      data={data}
      name={`${definition.id}-v${definition.version}-starter`}
      description="The chronology, every record in each part of this page, the open questions, the questions set aside and the list of what the records cannot answer. Each citation gives the original source and the place in it first, then the Selekoa claim and evidence identifiers. Stored paraphrases and permitted short quotes are included. Original documents are not."
      build={async () => {
        const starter = await questionStarter(data, definition);
        return {
          md: questionStarterMarkdown(starter),
          json: starterJson(starter),
          sources: starter.sources,
        };
      }}
    />
  );
}
