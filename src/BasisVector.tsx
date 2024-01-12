import React, { useEffect, useState } from "react";
import { Vector } from "./types/Vector.ts";
import { P5CanvasInstance, ReactP5Wrapper } from "@p5-wrapper/react";

function disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

function enableScrolling(){
    window.onscroll=function(){};
}

const sketch = (p5: P5CanvasInstance<any>) => {
  let vector: Vector = new Vector(0, 0);
  let side = 200;
  let lineWidth = 1;
  let clicked = false;
  let overBox = false;
  let id = 0;
  let onChange = (vector: Vector) => {};
  const checkOverBox = () => {
    if (
      p5.mouseX > 0 &&
      p5.mouseX < side &&
      p5.mouseY > 0 &&
      p5.mouseY < side
    ) {
      overBox = true;
    } else {
      overBox = false;
    }
  };
  p5.updateWithProps = (props: any) => {
    vector = props.vector || vector;
    vector = vector.multiply(side / 2);
    onChange = props.onChange || onChange;
    id = props.id || id;
  };
  p5.setup = () => {
    p5.createCanvas(side, side);
    p5.strokeWeight(lineWidth);
    p5.antialias = true;
  };
  p5.draw = () => {
    p5.background(0);
    p5.fill(255);
    p5.stroke(255);
    p5.translate(side / 2, side / 2);
    p5.scale(1, -1);
    checkOverBox();
    vector.draw(p5);
    if (overBox || clicked) {
      p5.fill(255, 100);
      p5.stroke(255, 100);
    }
  };
  p5.mouseDragged = () => {
    if (!clicked) return;
    vector = new Vector(p5.mouseX - side / 2, (side-p5.mouseY) - side / 2);
    onChange(vector.divide(side / 2));
  };
  p5.mousePressed = () => {
    if (overBox) clicked = true;
    else clicked = false;
  };
  p5.mouseReleased = () => {
    clicked = false;
  };
};

const BasisVector = (props: any) => {
  return (
    <div className="basis-vector">
        <div className='vector-input'>
            <input type="number" value={props.vector.x} onChange={(e)=>props.onChange(new Vector( parseFloat(e.target.value),props.vector.y))}/>
            <input type="number" value={props.vector.y} onChange={(e)=>props.onChange(new Vector( props.vector.x,parseFloat(e.target.value)))}/>
        </div>
      <ReactP5Wrapper
        sketch={sketch}
        onChange={props.onChange}
        vector={props.vector}
        id={props.id}
      />
    </div>
  );
};

export { BasisVector };
