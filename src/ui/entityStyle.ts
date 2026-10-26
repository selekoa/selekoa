import type { Entity } from '../domain/schema';

// Shared silhouettes: map, legend and Inspector use exactly the same paths.
export const entityStyle: Record<
  Entity['type'],
  { path: string; label: string }
> = {
  organisation: {
    path: 'M-9-8H9V8H-9ZM-5-4H5M-5 0H5M-5 4H5',
    label: 'Organisation',
  },
  person: {
    path: 'M0-9A4 4 0 1 1 0-1A4 4 0 1 1 0-9M-7 9V6Q-7 1 0 1Q7 1 7 6V9Z',
    label: 'Person',
  },
  document: {
    path: 'M-7-10H3L8-5V10H-7ZM3-10V-5H8M-3 0H4M-3 4H4',
    label: 'Document',
  },
  concept: { path: 'M0-10L10 0L0 10L-10 0ZM0-4V4M-4 0H4', label: 'Concept' },
  infrastructure: {
    path: 'M-10-8H10V-1H-10ZM-10 2H10V9H-10ZM-6-5H-3M-6 5H-3',
    label: 'Infrastructure',
  },
  model: {
    path: 'M-9-5L0-10L9-5V5L0 10L-9 5ZM-9-5L0 0L9-5M0 0V10',
    label: 'Model',
  },
  public_body: {
    path: 'M-10-4L0-10L10-4ZM-7-1V7M0-1V7M7-1V7M-10 10H10',
    label: 'Public body',
  },
  fund: {
    path: 'M-10-5L-5-10H5L10-5V5L5 10H-5L-10 5ZM-5-4H5V4H-5Z',
    label: 'Fund',
  },
};
