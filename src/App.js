import * as d3 from "d3";
import { useCallback, useEffect, useRef, useState } from "react";

function useD3(renderFunc, deps) {
  const elemRef = useRef(null);

  const renderFuncRef = useRef(renderFunc);
  renderFuncRef.current = renderFunc;

  useEffect(() => {
    const ref = d3.select(elemRef.current);
    renderFuncRef.current({ d3, ref });
    return () => {};
  }, [renderFuncRef, elemRef, deps]);

  return useCallback((ref) => {
    elemRef.current = ref;
  }, []);
}

const data = [35, 45, 30, 60, 15];

const useWindowResizeEvent = (callback) => {
  const ref = useRef(callback);
  ref.current = callback;

  useEffect(() => {
    const handle = (e) => {
      ref.current(e);
    };
    window.addEventListener("resize", handle);
    return () => {
      window.removeEventListener("resize", handle);
    };
  }, []);
};

const BarChart = ({ data, width, height }) => {
  const ref = useD3(
    ({ ref, d3 }) => {
      ref
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("fill", "pink")
        .attr("stroke", "black")
        .attr("stroke-width", "2px")
        .attr("x", (d, i) => (i * width) / data.length)
        .attr("height", (d) => d)
        .attr("width", () => width / data.length);
    },
    [width]
  );

  return <svg width={`${width}`} height={`${height}`} ref={ref} />;
};

function App() {
  return (
    <div className="App">
      <BarChart data={data} width={300} height={100} />
    </div>
  );
}

export default App;
