import { Drawable } from "./Drawable.ts";
import { Vector } from "./Vector.ts";

class Point extends Drawable {
    constructor(public x: number, public y: number) {
      super();
      this.x = x;
      this.y = y;
    }
    draw() {
      Point.p5.point(this.x, this.y);
    }
    add(vector: Vector) {
      return new Point(this.x + vector.x, this.y + vector.y);
    }
    subtract(vector: Vector) {
      return new Point(this.x - vector.x, this.y - vector.y);
    }
  }

export { Point };