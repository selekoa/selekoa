/**
 * The collection definitions as releases record them: those the application
 * reads (src/release/collections.ts), each propositions collection whole,
 * with its reader text. Not part of the browser's shared code.
 */
import { propositionCollections } from '../reading/human-thought';
import { modelCards } from '../reading/model-cards';
import { lawsCompared } from '../reading/laws-compared';
import { predictionsOnRecord } from '../reading/predictions';
import {
  applicationCollections,
  type CollectionDefinition,
} from './collections';

const whole = new Map(propositionCollections.map((c) => [c.id, c]));

export const wholeCollections: CollectionDefinition[] =
  applicationCollections.map((c) =>
    c.kind === 'propositions'
      ? { kind: c.kind, definition: whole.get(c.definition.id)! }
      : c.kind === 'compare' && c.definition.id === modelCards.id
        ? { kind: c.kind, definition: modelCards }
        : c.kind === 'compare' && c.definition.id === lawsCompared.id
          ? { kind: c.kind, definition: lawsCompared }
          : c.kind === 'predictions' &&
              c.definition.id === predictionsOnRecord.id
            ? { kind: c.kind, definition: predictionsOnRecord }
            : c,
  );
