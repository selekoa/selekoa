/**
 * The address and title of the control timelines page, apart from its
 * definition (src/reading/control-timelines.ts), so that the hubs, whose
 * code loads with the start page, can link to it without its text.
 */
export const controlTimelinesId = 'side-by-side';
export const controlTimelinesTitle = 'Control timelines side by side';
/** The page's question, also its description for search engines. */
export const controlTimelinesQuestion =
  'How did the boards, ownership and control of OpenAI, Anthropic, Google DeepMind and xAI change, read on one time axis?';
/**
 * The organisations the page shows, in its row order; the definition's lanes
 * name the same (src/domain/control-timelines.test.ts). Dossiers link to the
 * page from these.
 */
export const controlTimelinesOrganisations: readonly string[] = [
  'openai',
  'anthropic',
  'google-deepmind',
  'xai',
];
/** The CSV of the records the page shows, written by the build. */
export const controlTimelinesCsvPath = '/control/side-by-side.csv';
