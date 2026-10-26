/**
 * A verbatim excerpt between curly quotation marks, so a reader can see where
 * it ends. Marks already present at either end are not doubled. The excerpt
 * is otherwise shown as stored; an ellipsis appears only where the stored
 * text has one.
 */
export function quoted(passage: string) {
  const text = passage.trim();
  return (
    (/^[“"]/.test(text) ? '' : '“') + text + (/[”"]$/.test(text) ? '' : '”')
  );
}
