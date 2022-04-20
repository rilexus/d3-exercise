import * as d3 from 'd3';
import {useCallback, useEffect, useMemo, useRef, useState, useTransition} from "react";

function useD3(renderFunc, data){
  const elemRef = useRef(null);

  const renderFuncRef = useRef(renderFunc);
  renderFuncRef.current = renderFunc;

  useEffect(() => {
    const ref = d3.select(elemRef.current);
    renderFuncRef.current({d3, ref, data});
    return () => {}
  }, [renderFuncRef, elemRef, ...data])

  return useCallback((ref) => {
    elemRef.current = ref;
  }, data);
}


const data = [35,45,30, 60, 15];


const width = 50


const BarChart = ({data}) => {
    const ref = useD3(({ref, d3, data}) => {
      const rects = ref
        .selectAll('rect')
        .data(data)
        .attr('x', (d, i) => i * width)
        .attr('height', (d) => d)
        .attr('width' , () => width);
    }, data);

  return <svg width={'300'} height={'100'} ref={ref}>
    {data.map((d, idx) => {
      return (
        <rect fill={'pink'} stroke={'black'} strokeWidth={'2px'} key={`${d}-${idx}`}/>
      )
    })}
  </svg>
}

function App() {

  return (
    <div className="App">
      <div>
      </div>
      <BarChart data={data}/>
    </div>
  );
}

export default App;
