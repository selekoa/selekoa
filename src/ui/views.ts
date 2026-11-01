/** The workspace's views (src/Workspace.tsx). */
export type View =
  | 'home'
  | 'hub'
  | 'about'
  | 'map'
  | 'claims'
  | 'timeline'
  | 'dossier'
  | 'path'
  | 'starter'
  | 'documents'
  | 'compare'
  | 'control'
  | 'commitments'
  | 'guide'
  | 'propositions'
  | 'year'
  | 'person'
  | 'document'
  | 'claim'
  | 'search';

/**
 * The view a record selected from a view opens: an organisation's dossier
 * from a reading page (a claim's own page among them), the explorer's list
 * for other records; the explorer keeps its own view.
 */
export function entityView(view: View, isInstitution: boolean): View {
  switch (view) {
    case 'path':
    case 'starter':
    case 'documents':
    case 'compare':
    case 'control':
    case 'commitments':
    case 'guide':
    case 'propositions':
    case 'year':
    case 'person':
    case 'document':
    case 'search':
    case 'claim':
      return isInstitution ? 'dossier' : 'claims';
    case 'dossier':
      return isInstitution ? 'dossier' : 'claims';
    case 'home':
    case 'hub':
      return isInstitution ? 'dossier' : 'map';
    default:
      return view;
  }
}
