import type { ControlTimelinesDefinition } from '../domain/control-timelines';

import {
  controlTimelinesId,
  controlTimelinesQuestion,
  controlTimelinesTitle,
} from './control-timelines-page';

/**
 * Four laboratories' control timelines on one time axis (roadmap, interface
 * item 4). OpenAI and Anthropic take the records of their control-structure
 * pages; Google DeepMind and xAI have no such page, so their stored records
 * of the same kinds are named here. No record is added by this page.
 */
export const controlTimelines: ControlTimelinesDefinition = {
  id: controlTimelinesId,
  title: controlTimelinesTitle,
  question: controlTimelinesQuestion,
  introduction:
    'Each row holds one organisation’s stored records of board changes, ownership changes and control rights, placed by date. The rows share a time axis so that dates can be read across organisations. Records that sit close together on the axis are not connected by that alone: no record here states a relation between the four organisations.',
  lanes: [
    { organisationId: 'openai', controlId: 'openai' },
    { organisationId: 'anthropic', controlId: 'anthropic' },
    {
      organisationId: 'google-deepmind',
      claimIds: [
        'google-acquired-deepmind-2014',
        'deepmind-combined-2023',
        'brain-combined-2023',
      ],
      selection:
        'Google DeepMind has no control-structure page. Its row holds the stored records of Google’s acquisition of DeepMind and of the 2023 combination that formed Google DeepMind. No board record for Google DeepMind is stored.',
    },
    {
      organisationId: 'xai',
      claimIds: [
        'xm-x-acquisition',
        'xm-spacex-acquisition',
        'lg-mx-xai-into-spacex-announced-2026',
        'lg-mx-xai-spacexai-name-2026',
      ],
      selection:
        'xAI has no control-structure page. Its row holds the stored records of acquisitions, combination and renaming that involve xAI. No board record for xAI is stored.',
    },
  ],
  // Provisions are the content of governing documents and are dated by them;
  // assessments of control are later readings, not changes. Both stay on the
  // control-structure pages.
  omittedKinds: ['provision', 'assessment'],
  limits: [
    'Funding rounds and equity stakes are not shown. They are not control rights, and the control-structure pages do not include them.',
    'A record is placed at the date it stores, at the precision it stores. A year or a month is drawn as a band across that year or month, never as a day.',
    'Roles and departures of staff who did not sit on a board or trust are not shown.',
  ],
};
