/**
 * A propositions collection loaded whole, with its reader text, by its page:
 * other pages hold only its frame (src/reading/proposition-frames.ts). The
 * browser loads it with the page's code before taking over a built page
 * (`preloadPage` in src/ui/page-modules.tsx), so the page reads it at once.
 */
import type { PropositionsCollection } from '../domain/propositions';
import { propositionLoaders } from '../reading/proposition-loaders';
import { track, type Tracked } from './tracked';

const loads = new Map<string, Tracked<PropositionsCollection | null>>();

/**
 * The collection with this ID, whole, or null for an ID no collection has
 * (an address that opens no page). Loaded once; tried again if it failed.
 */
export function wholePropositions(
  id: string,
): Tracked<PropositionsCollection | null> {
  let found = loads.get(id);
  if (!found) {
    const load = Object.hasOwn(propositionLoaders, id)
      ? propositionLoaders[id]
      : () => Promise.resolve(null);
    found = track<PropositionsCollection | null>(
      load().catch((error: unknown) => {
        loads.delete(id);
        throw error;
      }),
    );
    loads.set(id, found);
  }
  return found;
}
