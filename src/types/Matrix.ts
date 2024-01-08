import { Vector } from "./Vector.ts";

class Matrix {
    side: number;
    constructor(public matrix: number[][]) {
      if (matrix.length !== matrix[0].length)
        throw new Error("Matrix must be square");
      this.side = matrix.length;
      this.matrix = matrix;
    }
    static identity(side: number) {
      let result: number[][] = [];
      for (let i = 0; i < side; i++) {
        result[i] = [];
        for (let j = 0; j < side; j++) {
          result[i][j] = i === j ? 1 : 0;
        }
      }
      return new Matrix(result);
    }
    transpose() {
      let matrix = this.matrix;
      let result: number[][] = [];
      for (let i = 0; i < matrix[0].length; i++) {
        result[i] = [];
        for (let j = 0; j < matrix.length; j++) {
          result[i][j] = matrix[j][i];
        }
      }
      return new Matrix(result);
    }
    scale(value: number) {
      let matrix = this.matrix;
      let result: number[][] = [];
      for (let i = 0; i < this.side; i++) {
        result[i] = [];
        for (let j = 0; j < this.side; j++) {
          result[i][j] = matrix[i][j] * value;
        }
      }
      return new Matrix(result);
    }
    add(matrix: Matrix) {
      let result: number[][] = [];
      for (let i = 0; i < this.side; i++) {
        result[i] = [];
        for (let j = 0; j < this.side; j++) {
          result[i][j] = this.matrix[i][j] + matrix.matrix[i][j];
        }
      }
      return new Matrix(result);
    }
    multiply(matrix: Matrix) {
      let result: number[][] = [];
      if (this.side !== matrix.side)
        throw new Error("Matrix must be square and have same side length");
      for (let i = 0; i < this.side; i++) {
        result[i] = [];
        for (let j = 0; j < this.side; j++) {
          result[i][j] = 0;
          for (let k = 0; k < this.side; k++) {
            result[i][j] += this.matrix[i][k] * matrix.matrix[k][j];
          }
        }
      }
      return new Matrix(result);
    }
    get basis(){
      let result: Vector[] = [];
      for (let i = 0; i < this.side; i++) {
        result[i] = new Vector(this.matrix[0][i], this.matrix[1][i]);
      }
      return result;
    }
    get determinant(){
      let matrix = this.matrix;
      if (matrix.length === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
      } else if(matrix.length==3) {
        return matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) - matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) + matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]);
      }else{
        throw new Error("Matrix must be 2x2 or 3x3");
      }
    }
    
  }

export { Matrix };