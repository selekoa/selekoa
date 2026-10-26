import type { Source } from './schema';

const names = new Intl.DisplayNames(['en'], { type: 'language' });
// Script-qualified names are fixed here because browser ICU data words them
// differently ("Traditional Chinese" or "Chinese (Traditional)").
const fixedNames: Record<string, string> = {
  'zh-Hans': 'Simplified Chinese',
  'zh-Hant': 'Traditional Chinese',
};

/** English display name for a stored BCP 47 tag, e.g. "Simplified Chinese". */
export function languageName(tag: string) {
  return fixedNames[tag] ?? names.of(tag) ?? tag;
}

/** The source language when it is recorded and not English; otherwise null. */
export function nonEnglishLanguage(source: Source) {
  const tag = source.language;
  if (!tag || tag === 'en' || tag.startsWith('en-')) return null;
  return { tag, name: languageName(tag) };
}

const day = (date: string) => {
  const [y, m = 1, d = 1] = date.split('-').map(Number);
  return Date.UTC(y, m - 1, d) / 864e5;
};

/**
 * The stored archive copy, with its capture date and a plain statement of
 * what a capture can and cannot show. Nothing is inferred beyond the stored
 * dates: the timing compares the capture with the recorded version or
 * publication date only when that date has day precision.
 */
export function archiveCopy(source: Source) {
  if (!source.archivedUrl) return null;
  const captured = source.archivedAt ?? null;
  const reference = source.versionDate
    ? { kind: 'version', date: source.versionDate }
    : source.publicationDate
      ? { kind: 'publication', date: source.publicationDate }
      : null;
  let timing: string | null = null;
  if (captured && reference && reference.date.length === 10) {
    const days = day(captured) - day(reference.date);
    timing =
      days === 0
        ? `Captured on the recorded ${reference.kind} date.`
        : `Captured ${Math.abs(days)} day${Math.abs(days) === 1 ? '' : 's'} ${days > 0 ? 'after' : 'before'} the recorded ${reference.kind} date.`;
  } else if (captured && !reference)
    timing = 'No publication date is recorded for this source.';
  const limit = captured
    ? `An archive copy shows only what the archive retrieved on ${captured}. It does not prove what the page said earlier, and it can differ from the copy checked on ${source.accessedAt}.`
    : 'An archive copy shows only what the archive retrieved at capture. It does not prove what the page said earlier.';
  return { url: source.archivedUrl, captured, timing, limit };
}
