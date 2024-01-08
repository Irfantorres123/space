import { Drawable } from "./Drawable.ts";
import { Matrix } from "./Matrix.ts";

class Vector extends Drawable{
    constructor(public x: number, public y: number) {
        super();
      this.x = x;
      this.y = y;
    }
    static fromAngle(angleInRadians: number) {
      return new Vector(Math.cos(angleInRadians), Math.sin(angleInRadians));
    }

    get angle() {
      return Math.atan2(this.y, this.x);
    } 
    get magnitude() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    get normalized() {
      return new Vector(this.x / this.magnitude, this.y / this.magnitude);
    }
    get perpendicular() {
      return new Vector(-this.y, this.x);
    }
    get negative() {
      return new Vector(-this.x, -this.y);
    }
    add(vector: Vector) {
      return new Vector(this.x + vector.x, this.y + vector.y);
    }
    subtract(vector: Vector) {
      return new Vector(this.x - vector.x, this.y - vector.y);
    }
    multiply(value: number) {
      return new Vector(this.x * value, this.y * value);
    }
    divide(value: number) {
      return new Vector(this.x / value, this.y / value);
    }
    dot(vector: Vector) {
      return this.x * vector.x + this.y * vector.y;
    }
    cross(vector: Vector) {
      return this.x * vector.y - this.y * vector.x;
    }
    transform(matrix: Matrix) {
        let x = this.x * matrix.matrix[0][0] + this.y * matrix.matrix[1][0];
        let y = this.x * matrix.matrix[0][1] + this.y * matrix.matrix[1][1];
        return new Vector(x, y);
    }
    draw(){
        Vector.p5.line(0,0,this.x,this.y);
    }
  }

export { Vector };