import { EdgeCurvedArrowProgram } from '@sigma/edge-curve';
import type { ProgramInfo } from 'sigma/rendering';
import type { RenderParams } from 'sigma/types';

// The package exposes only EdgeProgramType, omitting the inherited public hook.
interface CurveWithUniforms extends InstanceType<
  typeof EdgeCurvedArrowProgram
> {
  setUniforms(params: RenderParams, program: ProgramInfo): void;
}
const CurveBase = EdgeCurvedArrowProgram as new (
  ...args: ConstructorParameters<typeof EdgeCurvedArrowProgram>
) => CurveWithUniforms;

export class SelectableCurveProgram extends CurveBase {
  override setUniforms(params: RenderParams, program: ProgramInfo) {
    // Sigma downsamples its picking buffer. A wider invisible target keeps thin
    // curves selectable without increasing their visible weight.
    super.setUniforms(
      program.isPicking ? { ...params, minEdgeThickness: 12 } : params,
      program,
    );
  }
}
