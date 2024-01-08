import React, { useEffect, useState } from "react";

const BasisVector=(props:any)=>{
    const [x,setX]=useState(props.vector.x)
    const [y,setY]=useState(props.vector.y)    
    
    return (<div>
        <input type="number" value={x} onChange={(e)=>setX(e.target.value)}/>
        <input type="number" value={y} onChange={(e)=>setY(e.target.value)}/>
        <button onClick={()=>props.onChange({x,y})}>Set</button>
    </div>)
}

export {BasisVector};