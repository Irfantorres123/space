import { Drawable } from "./Drawable.ts";
import { Point } from "./Point.ts";
import { Vector } from "./Vector.ts";


class Line extends Drawable {
    constructor(public startx: number, public starty: number, public endx: number, public endy: number,public color:number=255) {
      super();
      this.startx = startx;
      this.starty = starty;
      this.endx = endx;
      this.endy = endy;
      this.color = color;
    }
    draw() {
      Line.p5.stroke(this.color);
      Line.p5.line(this.startx, this.starty, this.endx, this.endy);
    }
    static fromPointAndAngle(centrePoint: Point, angleInDegrees: number,length:number,color:number=255) {
      let radians = angleInDegrees * (Math.PI / 180);
      let vector = Vector.fromAngle(radians);
      length*=1000;
      let start=centrePoint.subtract(vector.multiply(length));
      let end = centrePoint.add(vector.multiply(length));
      return new Line(start.x, start.y, end.x, end.y,color);
      
    }
    scale(value: number) {
        return new Line(this.startx*value,this.starty*value,this.endx*value,this.endy*value,this.color);
    }
  }
  
export { Line };