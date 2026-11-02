import { startHref, type StartAction } from './SiteChrome';
import { NavLink } from './NavLink';
import {
  controlTimelinesId,
  controlTimelinesTitle,
} from '../reading/control-timelines-page';
import { stancesTitle } from '../reading/proposition-stances-page';
import './tools.css';

/**
 * Tools: pages a reader operates (a comparison, the years, the map, the
 * explorer), as distinct from readings (questions and guides). Every tool
 * link uses this one style. Add a tool here, once, and the start page's
 * "Ways in" panel lists it.
 */
export type ReaderTool = {
  id: string;
  label: string;
  /** What the tool does, in a few words. */
  does: string;
  action: StartAction;
};

export const readerTools: ReaderTool[] = [
  {
    id: 'compare',
    label: 'Compare frameworks',
    does: 'the same questions put to every safety framework',
    action: { kind: 'compare', id: 'frontier-safety-frameworks' },
  },
  {
    id: 'control-timelines',
    label: controlTimelinesTitle,
    does: 'OpenAI, Anthropic, Google DeepMind and xAI on one time axis',
    action: { kind: 'control', id: controlTimelinesId },
  },
  {
    id: 'stances',
    label: stancesTitle,
    does: 'which texts state or dispute each proposition, by author and date',
    action: { kind: 'stances' },
  },
  {
    id: 'years',
    label: 'Browse by year',
    does: 'every dated record, one page per year',
    action: { kind: 'years' },
  },
  {
    id: 'map',
    label: 'See a map',
    does: 'OpenAI’s direct connections',
    action: { kind: 'dossier', id: 'openai', view: 'map' },
  },
  {
    id: 'explore',
    label: 'Explore the records',
    does: 'every claim as a list, timeline or map',
    action: { kind: 'explore' },
  },
];

export const toolById = (id: string) => readerTools.find((t) => t.id === id)!;

type Ids = Parameters<typeof startHref>[1];

/** A tool's link, in the style every tool shares. */
export function ToolLink({
  tool,
  ids,
  onAction,
  label = tool.label,
  described = true,
}: {
  tool: ReaderTool;
  ids: Ids;
  onAction: (action: StartAction) => void;
  label?: string;
  /** Whether to show what the tool does after its name. */
  described?: boolean;
}) {
  return (
    <NavLink
      className="tool-link"
      data-tool={tool.id}
      aria-label={described ? `${label}: ${tool.does}` : undefined}
      href={startHref(tool.action, ids)}
      onOpen={() => onAction(tool.action)}
    >
      <svg
        className="tool-mark"
        aria-hidden="true"
        focusable="false"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M1.5 3.5h11M1.5 10.5h11" />
        <circle cx="5" cy="3.5" r="1.6" fill="var(--color-page)" />
        <circle cx="9.5" cy="10.5" r="1.6" fill="var(--color-page)" />
      </svg>
      <span className="tool-label">{label}</span>
      {described && <span className="tool-does">{tool.does}</span>}
    </NavLink>
  );
}
