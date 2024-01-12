"use strict";
import React, { useEffect, useRef, useState } from "react";
import {
  P5CanvasInstance,
  ReactP5Wrapper,
  SketchProps,
} from "@p5-wrapper/react";
import { Matrix } from "./types/Matrix.ts";
import { MatrixSketchProps } from "./types/MatrixSketchProps.ts";
import { Drawable } from "./types/Drawable.ts";
import { Vector } from "./types/Vector.ts";
import { Line } from "./types/Line.ts";
import { Point } from "./types/Point.ts";
import { BasisVector } from "./BasisVector.tsx";


function radiansToDegrees(radians: number) {
  return radians * (180 / Math.PI);
}

function sketch(p5: P5CanvasInstance<MatrixSketchProps>) {
  const spacing = 40;
  const lineWidth = 1;
  const width = 800;
  const height = 800;
  let matrix = Matrix.identity(2);
  let lines: Line[] = [];
  let vectors: Vector[] = [];
  const addGridLines = () => {
    let [basisx,basisy]= matrix.basis;
    let scaledX = basisx.multiply(spacing);
    let scaledY = basisy.multiply(spacing);
    let vector = new Vector(0,0);
    lines.push(Line.fromPointAndAngle(new Point(vector.x,vector.y),radiansToDegrees(basisx.angle), height));
    vector=vector.add(scaledY);
    let maxVectors=1000;
    let count=0;
    while(count<maxVectors){
      lines.push(Line.fromPointAndAngle(new Point(vector.x,vector.y),radiansToDegrees(basisx.angle), height,127));
      lines.push(Line.fromPointAndAngle(new Point(vector.negative.x,vector.negative.y),radiansToDegrees(basisx.angle), height,127));
      vector=vector.add(scaledY);
      count++;
    }
    vector=new Vector(0,0);
    lines.push(Line.fromPointAndAngle(new Point(vector.x,vector.y),radiansToDegrees(basisy.angle), height));
    vector=vector.add(scaledX);
    count=0;

    while(count<maxVectors){
      lines.push(Line.fromPointAndAngle(new Point(vector.x,vector.y),radiansToDegrees(basisy.angle), height,127));
      lines.push(Line.fromPointAndAngle(new Point(vector.negative.x,vector.negative.y),radiansToDegrees(basisy.angle), height,127));
      vector=vector.add(scaledX);
      count++;
    }
  }

  const drawGrid = () => {
    for (let i in lines) {
      lines[i].draw(p5);
    }
  };

  const drawVectors = () => {
    for (let i in vectors) {
      vectors[i].draw(p5);
    }
  };

  p5.setup = () => {
    let canvas=p5.createCanvas(800, 800);
    let context:CanvasRenderingContext2D=canvas.drawingContext;
    //context.transform(1, 0, 0, -1, 0, canvas.height);
    
  };


  p5.updateWithProps = (props: MatrixSketchProps) => {
    matrix = props.matrix || matrix;
    lines = []
    addGridLines();
    vectors = props.vectors || [];
    vectors =vectors.map((vector:Vector)=>vector.transform(matrix.scale(spacing)));
    
  };


  p5.draw = () => {
    p5.background(0);
    p5.fill(255);
    p5.stroke(255);
    p5.strokeWeight(lineWidth);
    p5.translate(p5.width / 2, p5.height / 2);
    p5.scale(1, -1);

    drawGrid();
    drawVectors();
  };
}

const Canvas = (props: any) => {
  const [basisx,setBasisx]=useState(new Vector(1,0));
  const [basisy,setBasisy]=useState(new Vector(0,1));
  
  return (
    <div
      className='canvas'
    >
      <ReactP5Wrapper
        sketch={sketch}
        matrix={
          new Matrix(
           [ [basisx.x,basisy.x],
            [basisx.y,basisy.y]]
          )
        }
        vectors={[new Vector(1, 1)]}
      /> 
      <div className="controls">
        <div className="basis-vectors">
          <BasisVector 
            vector={basisx}
            onChange={(vector:Vector)=>setBasisx(vector)}
            id={1}
          />
          <BasisVector
           vector={basisy}
           onChange={(vector:Vector)=>setBasisy(vector)}
            id={2}
           />

        </div>
      </div>
      
    </div>
  );
};

export default Canvas;
