'use strict';
import { P5CanvasInstance } from "@p5-wrapper/react";
import { MatrixSketchProps } from "./MatrixSketchProps.ts";

class Drawable {
    static p5: P5CanvasInstance<MatrixSketchProps>;
    static setP5(p5: P5CanvasInstance<MatrixSketchProps>) {
      Drawable.p5 = p5;
    }
    draw() {}
  }

export { Drawable };