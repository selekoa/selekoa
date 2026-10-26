import type { Entity } from '../domain/schema';
import { entityStyle } from './entityStyle';
export function EntitySymbol({ type }: { type: Entity['type'] }) {
  return (
    <svg className="entity-glyph" viewBox="-13 -13 26 26" aria-hidden="true">
      <path d={entityStyle[type].path} />
    </svg>
  );
}
