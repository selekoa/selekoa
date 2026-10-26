import type { Source } from '../domain/schema';
import { archiveCopy, nonEnglishLanguage } from '../domain/source-archive';

/** Link to the stored archive copy, labelled with its capture date. */
export function ArchiveLink({
  source,
  label = 'Archived copy',
}: {
  source: Source;
  label?: string;
}) {
  const copy = archiveCopy(source);
  if (!copy) return null;
  return (
    <a href={copy.url} target="_blank" rel="noreferrer" title={copy.limit}>
      {label}
      {copy.captured ? `, captured ${copy.captured}` : ''}
      <span className="visually-hidden">: {source.title}</span>
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}

/** "In Simplified Chinese (zh-Hans)" for non-English sources; nothing otherwise. */
export function SourceLanguage({ source }: { source: Source }) {
  const language = nonEnglishLanguage(source);
  if (!language) return null;
  return (
    <span>
      In {language.name} ({language.tag})
    </span>
  );
}

/** Archive link followed by its timing and what a capture cannot show. */
export function ArchiveNote({
  source,
  label,
}: {
  source: Source;
  label?: string;
}) {
  const copy = archiveCopy(source);
  if (!copy) return null;
  return (
    <>
      <ArchiveLink source={source} label={label} />. {copy.timing} {copy.limit}
    </>
  );
}
