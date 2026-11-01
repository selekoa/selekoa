/**
 * The collection definitions as releases record them: those the application
 * reads (src/release/collections.ts), each propositions collection whole,
 * with its reader text. Not part of the browser's shared code.
 */
import { propositionCollections } from '../reading/human-thought';
import {
  applicationCollections,
  type CollectionDefinition,
} from './collections';

const whole = new Map(propositionCollections.map((c) => [c.id, c]));

export const wholeCollections: CollectionDefinition[] =
  applicationCollections.map((c) =>
    c.kind === 'propositions'
      ? { kind: c.kind, definition: whole.get(c.definition.id)! }
      : c,
  );
