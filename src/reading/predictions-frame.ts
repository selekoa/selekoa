import type { PredictionsFrame } from '../domain/predictions';
import {
  predictionsId,
  predictionsQuestion,
  predictionsTitle,
} from './predictions-page';

// The identity of "Predictions on record", which shared code reads
// (src/release/collections.ts). Its records are every `states_prediction`
// record (src/domain/predictions.ts); its reader text is in ./predictions.ts.
export const predictionsFrame: PredictionsFrame = {
  id: predictionsId,
  version: 1,
  title: predictionsTitle,
  question: predictionsQuestion,
  editorialStatus: 'machine-proposed',
};
