import { SketchProps } from "@p5-wrapper/react";
import { Matrix } from "./Matrix.ts";
import { Vector } from "./Vector.ts";

type MatrixSketchProps = SketchProps & {
    matrix: Matrix;
    vectors:Vector[]
  };

export { MatrixSketchProps };