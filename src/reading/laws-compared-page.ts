/**
 * The address, title and question of "Laws compared", apart from its frame
 * (./laws-compared-frame.ts) and its reader text (./laws-compared.ts), so
 * that the hubs and page titles, whose code loads with the start page, can
 * name it without its columns or text.
 */
export const lawsComparedId = 'laws-compared';
export const lawsComparedTitle = 'Laws compared';
/** The page's question, also its description for search engines. */
export const lawsComparedQuestion =
  'What does each binding government instrument that addresses developers of frontier or general-purpose AI models say on the same questions?';
/**
 * The earlier texts a reader can switch a column to (`?edition=`), for the
 * address resolver: New York's RAISE Act as signed in 2025. Checked against
 * the frame in src/domain/law-comparison.test.ts.
 */
export const lawsComparedEarlierTexts = ['ny-raise-act-chapter-699-2025'];
