/**
 * The address, title and question of "Predictions on record", apart from its
 * reader text (./predictions.ts), so that the hubs and page titles, whose code
 * loads with the start page, can name it without its text.
 */
export const predictionsId = 'predictions-on-record';
export const predictionsTitle = 'Predictions on record';
/** The page's question, also its description for search engines. */
export const predictionsQuestion =
  'What did people and institutions predict about machine intelligence, and when: by what date, and with what stated probability?';
/** The collection as a CSV file, written by the build beside the page. */
export const predictionsCsvPath = `/predictions/${predictionsId}.csv`;
